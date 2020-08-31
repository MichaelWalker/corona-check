﻿import {DataPoint, RawData, RawDataPoint, TimeSeries} from "./dataStructures";
import moment from "moment";

type RawDataPointWithDate = RawDataPoint & {date: moment.Moment};

export const calculateTimeSeries = (rawData: RawData): TimeSeries => {
    return rawData
        .map(parseDate)
        .sort(byDate)
        .map(toDataPoint);
};

const parseDate = (rawDataPoint: RawDataPoint): RawDataPointWithDate => {
  return {
      ...rawDataPoint,
      date: moment(rawDataPoint.dateString)
  }  
};

const byDate = (a: RawDataPointWithDate, b: RawDataPointWithDate): number => {
    return a.date > b.date ? 1 : -1;
};

const toDataPoint = (dataPoint: RawDataPoint, index: number, rawData: RawData): DataPoint => {
    const populationRatio = dataPoint.casesTotal / dataPoint.casesTotalPerPopulation;
    const lastWeek = lastSevenPoints(rawData, index);
    const casesRollingAverage = calculateRollingAverage(lastWeek.map(d => d.casesNew));
    const admissionsRollingAverage = calculateRollingAverage(lastWeek.map(d => d.admissionsNew));
    const deathsRollingAverage = calculateRollingAverage(lastWeek.map(d => d.deathsNew));

    return {
        ...dataPoint,

        date: moment(dataPoint.dateString),

        casesNewPerPopulation: dataPoint.casesNew / populationRatio,
        casesRollingAverage: casesRollingAverage,
        casesRollingAveragePerPopulation: casesRollingAverage / populationRatio,

        admissionsNewPerPopulation: dataPoint.admissionsNew / populationRatio,
        admissionsTotalPerPopulation: dataPoint.admissionsTotal / populationRatio,
        admissionsRollingAverage: admissionsRollingAverage,
        admissionsRollingAveragePerPopulation: admissionsRollingAverage / populationRatio,

        deathsNewPerPopulation: dataPoint.deathsNew / populationRatio,
        deathsTotalPerPopulation: dataPoint.deathsTotal / populationRatio,
        deathsRollingAverage: deathsRollingAverage,
        deathsRollingAveragePerPopulation: deathsRollingAverage / populationRatio,

        hospitalUtilisation: (dataPoint.hospitalCapacity)? dataPoint.hospitalCases * 100 / dataPoint.hospitalCapacity : 0
    }
};

const lastSevenPoints = (rawData: RawData, index: number) => {
    if (index <= 7) {
        return rawData.slice(0, index);
    }
    return rawData.slice(index - 6, index + 1);
};

const calculateRollingAverage = (lastSevenReadings: number[]) => {
    if (lastSevenReadings.length === 0) {
        return 0;
    }
    const sum = lastSevenReadings.reduce((a, b) => a + b);
    return sum / 7;
};

import moment from "moment";
import {TimeSeries} from "./dataStructures";
import {Metric} from "../config/options";

interface GraphPoint {
    timestamp: number,
    value: number | undefined,
    rollingAverage?: number | undefined
}

export type GraphData = GraphPoint[];

export const getPlotSeries = (timeSeries: TimeSeries, metric: Metric, startDate?: moment.Moment, endDate?: moment.Moment): GraphData => {
    const dataSegment = getDataSegment(timeSeries, startDate, endDate);
    switch (metric) {
        case "New Cases":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.casesNew, rollingAverage: d.casesRollingAverage}});
        case "New Cases Per Population":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.casesNewPerPopulation, rollingAverage: d.casesRollingAveragePerPopulation}});
        case "Total Cases":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.casesTotal}});
        case "Total Cases Per Population":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.casesTotalPerPopulation}});
        case "New Admissions":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.admissionsNew, rollingAverage: d.admissionsRollingAverage}});
        case "New Admissions Per Population":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.admissionsNewPerPopulation, rollingAverage: d.admissionsRollingAveragePerPopulation}});
        case "Total Admissions":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.admissionsTotal}});
        case "Total Admissions Per Population":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.admissionsTotalPerPopulation}});
        case "New Deaths":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.deathsNew, rollingAverage: d.deathsRollingAverage}});
        case "New Deaths Per Population":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.deathsNewPerPopulation, rollingAverage: d.deathsRollingAveragePerPopulation}});
        case "Total Deaths":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.deathsTotal}});
        case "Total Deaths Per Population":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.deathsTotalPerPopulation}});
        case "Hospital Cases":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.hospitalCases}});
        case "Hospital Capacity":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.hospitalCapacity}});
        case "Hospital Utilisation":
            return dataSegment.map(d => {return {timestamp: d.date.unix(), value: d.hospitalUtilisation}});
        default: 
            return []
    }
};

const getDataSegment = (allData: TimeSeries, 
                        startDate: moment.Moment = moment("01/03/2020"), 
                        endDate: moment.Moment = moment()) => {
    return allData
        .filter(dataPoint => dataPoint.date.isSameOrAfter(startDate))
        .filter(dataPoint => dataPoint.date.isSameOrBefore(endDate));
};
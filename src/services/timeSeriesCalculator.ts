import {DataPoint, RawData, RawDataPoint, TimeSeries} from "./dataStructures";
import moment from "moment";

type RawDataPointWithDate = RawDataPoint & {date: moment.Moment};

export const calculateTimeSeries = (rawData: RawData): TimeSeries => {
    const startDate = moment("01 March 2020");
    return rawData
        .map(parseDate)
        .filter(dataPoint => dataPoint.date.isSameOrAfter(startDate, "day"))
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
    const lastWeek = lastSevenPoints(rawData, index);

    return {
        ...dataPoint,
        date: moment(dataPoint.dateString),
        newCasesByPublishDateRollingAverage: calculateRollingAverage(lastWeek.map(d => d.newCasesByPublishDate)),
        newCasesBySpecimenDateRollingAverage: calculateRollingAverage(lastWeek.map(d => d.newCasesBySpecimenDate)),
        newCases: getBestCaseFigure(dataPoint),
        newCasesRollingAverage: calculateRollingAverage(lastWeek.map(d => getBestCaseFigure(d))),
        totalCases: getBestTotalCaseFigure(dataPoint),
        newAdmissionsRollingAverage: calculateRollingAverage(lastWeek.map(d => d.newAdmissions)),
        newDeathsByPublishDateRollingAverage: calculateRollingAverage(lastWeek.map(d => d.newDeathsByPublishDate)),
        newDeathsByDeathDateRollingAverage: calculateRollingAverage(lastWeek.map(d => d.newDeathsByDeathDate)),
        newDeaths: getBestDeathsFigure(dataPoint),
        newDeathsRollingAverage: calculateRollingAverage(lastWeek.map(d => getBestDeathsFigure(d))),
        totalDeaths: getBestTotalDeathsFigure(dataPoint),
        newTestsRollingAverage: calculateRollingAverage(lastWeek.map(d => d.newTests)),
    }
};

const getBestCaseFigure = (dataPoint: RawDataPoint): number | null => {
    if (dataPoint.newCasesBySpecimenDate !== null) {
        return dataPoint.newCasesBySpecimenDate;
    }
    if (dataPoint.newCasesByPublishDate !== null) {
        return dataPoint.newCasesByPublishDate;
    }
    return null;
};

const getBestTotalCaseFigure = (dataPoint: RawDataPoint): number | null => {
    if (dataPoint.newCasesBySpecimenDate !== null) {
        return dataPoint.cumulativeCasesBySpecimenDate;
    }
    if (dataPoint.newCasesByPublishDate !== null) {
        return dataPoint.cumulativeCasesByPublishDate;
    }
    return null;
};

const getBestDeathsFigure = (dataPoint: RawDataPoint): number | null => {
    if (dataPoint.newDeathsByDeathDate !== null) {
        return dataPoint.newDeathsByDeathDate;
    }
    if (dataPoint.newDeathsByPublishDate !== null) {
        return dataPoint.newDeathsByPublishDate;
    }
    return null;
};

const getBestTotalDeathsFigure = (dataPoint: RawDataPoint): number | null => {
    if (dataPoint.cumulativeDeathsByDeathDate !== null) {
        return dataPoint.cumulativeDeathsByDeathDate;
    }
    if (dataPoint.cumulativeDeathsByPublishDate !== null) {
        return dataPoint.cumulativeDeathsByPublishDate;
    }
    return null;
};


const lastSevenPoints = (rawData: RawData, index: number) => {
    if (index <= 7) {
        return rawData.slice(0, index);
    }
    return rawData.slice(index - 6, index + 1);
};

const calculateRollingAverage = (lastSevenReadings: (number | null)[]): number | null => {
    const nonNullReadings = lastSevenReadings.filter(reading => reading !== null) as number[];
    if (nonNullReadings.length === 0) {
        return 0;
    }
    const sum = nonNullReadings.reduce((a, b) => a + b);
    return sum / nonNullReadings.length;
};

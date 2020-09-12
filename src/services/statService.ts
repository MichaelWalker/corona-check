import {DataPoint, TimeSeries} from "./dataStructures";
import moment from "moment";

export interface StatCategory {
    new: number;
    total: number;
    trend: number;
    date: moment.Moment;
}

export interface Stats {
    cases: StatCategory;
}

export const getStats = (timeSeries: TimeSeries): Stats => {
    return {
        cases: getCaseStats(timeSeries)
    }  
};

const getCaseStats = (timeSeries: TimeSeries): StatCategory => {
    const lastDataPoint = getMostRecentDataPoint(timeSeries, "newCasesByPublishDate");
    return {
        new: lastDataPoint.newCasesByPublishDate,
        total: lastDataPoint.cumulativeCasesByPublishDate,
        trend: 1,
        date: lastDataPoint.date,
    }
};

const getMostRecentDataPoint = (timeSeries: TimeSeries, property: keyof DataPoint): DataPoint => {
    return timeSeries
        .filter(dataPoint => dataPoint[property])
        .reverse()[0];
};
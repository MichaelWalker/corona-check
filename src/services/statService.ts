import {DataPoint, TimeSeries} from "./dataStructures";
import moment from "moment";

export interface Stat {
    value: number;
    lastUpdated: moment.Moment;
}

export interface StatCategory {
    new: Stat | undefined;
    total: Stat | undefined;
    trend: Stat | undefined;
}

export interface Stats {
    cases: StatCategory;
}

export const getStats = (timeSeries: TimeSeries): Stats => {
    return {
        cases: {
            new: getStatFor(timeSeries, "newCases"),
            total: getStatFor(timeSeries, "totalCases"),
            trend: undefined,
        }
    }  
};

const getStatFor = (timeSeries: TimeSeries, key: keyof DataPoint): Stat | undefined => {
    const dataPoint = getMostRecentDataPoint(timeSeries, key);
    
    if (!dataPoint) {
        return undefined;
    }
    
    return {
        value: dataPoint[key] as number,
        lastUpdated: dataPoint.date,
    }
};

const getMostRecentDataPoint = (timeSeries: TimeSeries, property: keyof DataPoint): DataPoint | undefined => {
    return timeSeries
        .filter(dataPoint => dataPoint[property])
        .reverse()[0];
};

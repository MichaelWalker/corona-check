import moment from "moment";
import {DataPoint, TimeSeries} from "./dataStructures";
import {Metric, Property} from "../config/options";

interface GraphPoint {
    timestamp: number,
    value: number | undefined,
    rollingAverage?: number | undefined
}

export type GraphData = GraphPoint[];

const getPlotValue = (dataPoint: DataPoint, property: Property): number => {
    return dataPoint[property.name] as number;
};

const getPlotRollingAverage = (dataPoint: DataPoint, property: Property): number | undefined => {
    if (!property.associatedAverage) {
        return undefined;
    }
    return dataPoint[property.associatedAverage] as number;
};
 
export const getPlotSeries = (timeSeries: TimeSeries, metric: Metric, startDate?: moment.Moment, endDate?: moment.Moment): GraphData => {
    const dataSegment = getDataSegment(timeSeries, startDate, endDate);
    const property = metric.property;
    
    return dataSegment.map(dataPoint => {
       return {
           timestamp: dataPoint.date.unix(),
           value: getPlotValue(dataPoint, property),
           rollingAverage: getPlotRollingAverage(dataPoint, property)
       } 
    });
};

const getDataSegment = (allData: TimeSeries, 
                        startDate: moment.Moment = moment("01/03/2020"), 
                        endDate: moment.Moment = moment()) => {
    return allData
        .filter(dataPoint => dataPoint.date.isSameOrAfter(startDate))
        .filter(dataPoint => dataPoint.date.isSameOrBefore(endDate));
};
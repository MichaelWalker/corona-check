import moment from "moment";
import {TimeSeries} from "./dataStructures";
import {Metric} from "../config/options";

interface GraphPoint {
    date: moment.Moment,
    value: number | undefined,
    rollingAverage?: number | undefined
}

export type GraphData = GraphPoint[];

export const getPlotSeries = (timeSeries: TimeSeries, metric: Metric, startDate?: moment.Moment, endDate?: moment.Moment): GraphData => {
    const dataSegment = getDataSegment(timeSeries, startDate, endDate);
    switch (metric) {
        case "New Cases":
            return dataSegment.map(d => {return {date: d.date, value: d.casesNew, rollingAverage: d.casesRollingAverage}});
        case "New Cases Per Population":
            return dataSegment.map(d => {return {date: d.date, value: d.casesNewPerPopulation, rollingAverage: d.casesRollingAveragePerPopulation}});
        case "Total Cases":
            return dataSegment.map(d => {return {date: d.date, value: d.casesTotal}});
        case "Total Cases Per Population":
            return dataSegment.map(d => {return {date: d.date, value: d.casesTotalPerPopulation}});
        case "New Admissions":
            return dataSegment.map(d => {return {date: d.date, value: d.admissionsNew, rollingAverage: d.admissionsRollingAverage}});
        case "New Admissions Per Population":
            return dataSegment.map(d => {return {date: d.date, value: d.admissionsNewPerPopulation, rollingAverage: d.admissionsRollingAveragePerPopulation}});
        case "Total Admissions":
            return dataSegment.map(d => {return {date: d.date, value: d.admissionsTotal}});
        case "Total Admissions Per Population":
            return dataSegment.map(d => {return {date: d.date, value: d.admissionsTotalPerPopulation}});
        case "New Deaths":
            return dataSegment.map(d => {return {date: d.date, value: d.deathsNew, rollingAverage: d.deathsRollingAverage}});
        case "New Deaths Per Population":
            return dataSegment.map(d => {return {date: d.date, value: d.deathsNewPerPopulation, rollingAverage: d.deathsRollingAveragePerPopulation}});
        case "Total Deaths":
            return dataSegment.map(d => {return {date: d.date, value: d.deathsTotal}});
        case "Total Deaths Per Population":
            return dataSegment.map(d => {return {date: d.date, value: d.deathsTotalPerPopulation}});
        case "Hospital Cases":
            return dataSegment.map(d => {return {date: d.date, value: d.hospitalCases}});
        case "Hospital Capacity":
            return dataSegment.map(d => {return {date: d.date, value: d.hospitalCapacity}});
        case "Hospital Utilisation":
            return dataSegment.map(d => {return {date: d.date, value: d.hospitalUtilisation}});
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
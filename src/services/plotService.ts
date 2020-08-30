import {TimeSeries} from "./dataProcessor";
import moment from "moment";
import {Metric} from "../components/Settings/SettingsContext";

interface GraphPoint {
    date: moment.Moment,
    value: number | undefined,
    rollingAverage?: number | undefined
}

export type GraphData = GraphPoint[];

export const getPlotSeries = (timeSeries: TimeSeries, metric: Metric): GraphData => {
    switch (metric) {
        case "New Cases":
            return timeSeries.map(d => {return {date: d.date, value: d.casesNew}});
        case "New Cases Per Population":
            return timeSeries.map(d => {return {date: d.date, value: d.casesNewPerPopulation}});
        case "Total Cases":
            return timeSeries.map(d => {return {date: d.date, value: d.casesTotal}});
        case "Total Cases Per Population":
            return timeSeries.map(d => {return {date: d.date, value: d.casesTotalPerPopulation}});
        case "New Admissions":
            return timeSeries.map(d => {return {date: d.date, value: d.admissionsNew}});
        case "New Admissions Per Population":
            return timeSeries.map(d => {return {date: d.date, value: d.admissionsNewPerPopulation}});
        case "Total Admissions":
            return timeSeries.map(d => {return {date: d.date, value: d.admissionsTotal}});
        case "Total Admissions Per Population":
            return timeSeries.map(d => {return {date: d.date, value: d.admissionsTotalPerPopulation}});
        case "New Deaths":
            return timeSeries.map(d => {return {date: d.date, value: d.deathsNew}});
        case "New Deaths Per Population":
            return timeSeries.map(d => {return {date: d.date, value: d.deathsNewPerPopulation}});
        case "Total Deaths":
            return timeSeries.map(d => {return {date: d.date, value: d.deathsTotal}});
        case "Total Deaths Per Population":
            return timeSeries.map(d => {return {date: d.date, value: d.deathsTotalPerPopulation}});
        case "Hospital Cases":
            return timeSeries.map(d => {return {date: d.date, value: d.hospitalCases}});
        case "Hospital Capacity":
            return timeSeries.map(d => {return {date: d.date, value: d.hospitalCapacity}});
        case "Hospital Utilisation":
            return timeSeries.map(d => {return {date: d.date, value: d.hospitalUtilisation}});
        default: 
            return []
    }
};
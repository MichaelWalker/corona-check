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
        case "Total Cases":
            return timeSeries.map(d => {return {date: d.date, value: d.casesTotal}});
        default: 
            return []
    }
};
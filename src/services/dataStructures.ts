import moment from "moment";

export interface RawDataPoint {
    dateString: string;
    newCasesByPublishDate: number;
    newCasesBySpecimenDate: number;
    cumulativeCasesByPublishDate: number;
    cumulativeCasesBySpecimenDate: number;
}

export type DataPoint = RawDataPoint & {
    date: moment.Moment;
    newCasesByPublishDateRollingAverage: number;
    newCasesBySpecimenDateRollingAverage: number;
}

export type RawData = RawDataPoint[];
export type TimeSeries = DataPoint[];

export interface R {
    last7Days: number;
    last14Days: number;
    last28Days: number;
}
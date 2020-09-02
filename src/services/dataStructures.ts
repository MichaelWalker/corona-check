import moment from "moment";

export interface RawDataPoint {
    dateString: string;
    newCasesByPublishDate: number;
    newCasesBySpecimenDate: number;
    cumulativeCasesByPublishDate: number;
    cumulativeCasesBySpecimenDate: number;
    newAdmissions: number;
    cumulativeAdmissions: number;
    newDeathsByPublishDate: number;
    newDeathsByDeathDate: number;
    cumulativeDeathsByPublishDate: number;
    cumulativeDeathsByDeathDate: number;
    peopleInHospital: number;
    hospitalCapacity: number;
    newTests: number;
    cumulativeTests: number;
}

export type DataPoint = RawDataPoint & {
    date: moment.Moment;
    newCasesByPublishDateRollingAverage: number;
    newCasesBySpecimenDateRollingAverage: number;
    newAdmissionsRollingAverage: number;
    newDeathsByPublishDateRollingAverage: number;
    newDeathsByDeathDateRollingAverage: number;
    newTestsRollingAverage: number;
}

export type RawData = RawDataPoint[];
export type TimeSeries = DataPoint[];

export interface R {
    last7Days: number;
    last14Days: number;
    last28Days: number;
}
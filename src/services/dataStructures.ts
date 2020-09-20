import moment from "moment";

export interface RawDataPoint {
    dateString: string;
    newCasesByPublishDate: number | null;
    newCasesBySpecimenDate: number | null;
    cumulativeCasesByPublishDate: number | null;
    cumulativeCasesBySpecimenDate: number | null;
    newAdmissions: number | null;
    cumulativeAdmissions: number | null;
    newDeathsByPublishDate: number | null;
    newDeathsByDeathDate: number | null;
    cumulativeDeathsByPublishDate: number | null;
    cumulativeDeathsByDeathDate: number | null;
    peopleInHospital: number | null;
    hospitalCapacity: number | null;
    newTests: number | null;
    cumulativeTests: number | null;
}

export type DataPoint = RawDataPoint & {
    date: moment.Moment;
    timestamp: number;
    newCasesByPublishDateRollingAverage: number | null;
    newCasesBySpecimenDateRollingAverage: number | null;
    newCases: number | null;
    newCasesRollingAverage: number | null;
    newAdmissionsRollingAverage: number | null;
    newDeathsByPublishDateRollingAverage: number | null;
    newDeathsByDeathDateRollingAverage: number | null;
    newDeaths: number | null;
    newDeathsRollingAverage: number | null;
    newTestsRollingAverage: number | null;
}

export type RawData = RawDataPoint[];
export type TimeSeries = DataPoint[];
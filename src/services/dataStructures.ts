import moment from "moment";

export interface RawDataPoint {
    dateString: string;
    hash: string;
    casesNew: number;
    casesTotal: number;
    casesTotalPerPopulation: number;
    admissionsNew: number;
    admissionsTotal: number;
    hospitalCases: number;
    hospitalCapacity: number;
    deathsNew: number;
    deathsTotal: number;
}

export interface R {
    last7Days: number;
    last14Days: number;
    last28Days: number;
}

export interface DataPoint {
    date: moment.Moment;

    // cases
    casesNew: number;
    casesTotal: number;
    casesNewPerPopulation: number;
    casesTotalPerPopulation: number;
    casesRollingAverage: number;
    casesRollingAveragePerPopulation: number;

    // admissions
    admissionsNew: number;
    admissionsTotal: number;
    admissionsNewPerPopulation: number;
    admissionsTotalPerPopulation: number;
    admissionsRollingAverage: number;
    admissionsRollingAveragePerPopulation: number;

    // deaths
    deathsNew: number;
    deathsTotal: number;
    deathsNewPerPopulation: number;
    deathsTotalPerPopulation: number;
    deathsRollingAverage: number;
    deathsRollingAveragePerPopulation: number;

    // hospitalisation
    hospitalCases: number;
    hospitalCapacity: number;
    hospitalUtilisation: number;
}

export type RawData = RawDataPoint[];
export type TimeSeries = DataPoint[];
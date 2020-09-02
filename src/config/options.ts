import {DataPoint} from "../services/dataStructures";

export type ViewerMode = "Graph" | "Raw";

export interface Property {
    name: keyof DataPoint;
    apiName: string;
    associatedAverage?: keyof DataPoint | undefined;
}

export interface Metric {
    label: string;
    byPublishedDate: Property;
    bySpecimenDate?: Property | undefined;
}

export const METRICS: Metric[] = [
    {
        label: "New Cases",
        byPublishedDate: {
            name: "newCasesByPublishDate",
            apiName: "newCasesByPublishDate",
            associatedAverage: "newCasesByPublishDateRollingAverage"
        },
        bySpecimenDate: {
            name: "newCasesBySpecimenDate",
            apiName: "newCasesBySpecimenDate",
            associatedAverage: "newCasesBySpecimenDateRollingAverage"
        }
    }  
];


// export type Metric =
//     "Total Cases" |
//     "Total Cases Per Population" |
//     "New Cases" |
//     "New Cases Per Population" |
//     "Total Admissions" |
//     "Total Admissions Per Population" |
//     "New Admissions" |
//     "New Admissions Per Population" |
//     "Total Deaths" |
//     "Total Deaths Per Population" |
//     "New Deaths" |
//     "New Deaths Per Population" |
//     "Hospital Cases" |
//     "Hospital Capacity" |
//     "Hospital Utilisation";
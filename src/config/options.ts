import {DataPoint} from "../services/dataStructures";

export type ViewerMode = "Graph" | "Raw";

export interface Property {
    name: keyof DataPoint;
    apiName: string;
    associatedAverage?: keyof DataPoint | undefined;
}

export interface Metric {
    label: string;
    property: Property;
}

export const METRICS: Metric[] = [
    {
        label: "New Cases (by publish date)",
        property: {
            name: "newCasesByPublishDate",
            apiName: "newCasesByPublishDate",
            associatedAverage: "newCasesByPublishDateRollingAverage"
        },
    },
    {
        label: "New Cases (by specimen date)",
        property: {
            name: "newCasesBySpecimenDate",
            apiName: "newCasesBySpecimenDate",
            associatedAverage: "newCasesBySpecimenDateRollingAverage"
        }
    },
    {
        label: "Cumulative Cases (by publish date)",
        property: {
            name: "cumulativeCasesByPublishDate",
            apiName: "cumCasesByPublishDate",
        }
    },
    {
        label: "Cumulative Cases (by specimen date)",
        property: {
            name: "cumulativeCasesBySpecimenDate",
            apiName: "cumCasesBySpecimenDate",
        }
    },
    {
        label: "New Admissions",
        property: {
            name: "newAdmissions",
            apiName: "newAdmissions",
            associatedAverage: "newAdmissionsRollingAverage"
        }
    },
    {
        label: "Cumulative Admissions",
        property: {
            name: "cumulativeAdmissions",
            apiName: "cumAdmissions",
        }
    },
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
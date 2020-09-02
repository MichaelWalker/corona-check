import {DataPoint} from "../services/dataStructures";

export type ViewerMode = "Graph" | "Raw";

export interface Property {
    name: keyof DataPoint;
    apiName: string;
    associatedData?: keyof DataPoint | undefined;
}

export interface Metric {
    label: string;
    property: Property;
    excludeFromStructure?: boolean | undefined;
}

export const METRICS: Metric[] = [
    {
        label: "New Cases (by publish date)",
        property: {
            name: "newCasesByPublishDate",
            apiName: "newCasesByPublishDate",
            associatedData: "newCasesByPublishDateRollingAverage"
        },
    },
    {
        label: "New Cases (by specimen date)",
        property: {
            name: "newCasesBySpecimenDate",
            apiName: "newCasesBySpecimenDate",
            associatedData: "newCasesBySpecimenDateRollingAverage"
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
            associatedData: "newAdmissionsRollingAverage"
        }
    },
    {
        label: "Cumulative Admissions",
        property: {
            name: "cumulativeAdmissions",
            apiName: "cumAdmissions",
        }
    },
    {
        label: "New Deaths (by publish date)",
        property: {
            name: "newDeathsByPublishDate",
            apiName: "newDeaths28DaysByPublishDate",
            associatedData: "newDeathsByPublishDateRollingAverage"
        }
    },
    {
        label: "New Deaths (by death date)",
        property: {
            name: "newDeathsByDeathDate",
            apiName: "newDeaths28DaysByDeathDate",
            associatedData: "newDeathsByDeathDateRollingAverage"
        }
    },
    {
        label: "Cumulative Deaths (by publish date)",
        property: {
            name: "cumulativeDeathsByPublishDate",
            apiName: "cumDeaths28DaysByPublishDate",
        }
    },
    {
        label: "Cumulative Deaths (by death date)",
        property: {
            name: "cumulativeDeathsByDeathDate",
            apiName: "cumDeaths28DaysByDeathDate",
        }
    },
    {
        label: "Hospital Capacity",
        property: {
            name: "hospitalCapacity",
            apiName: "plannedCapacityByPublishDate",
        }
    },
    {
        label: "People In Hospital",
        property: {
            name: "peopleInHospital",
            apiName: "hospitalCases",
        }
    },
    {
        label: "Hospital Utilisation",
        property: {
            name: "peopleInHospital",
            apiName: "hospitalCases",
            associatedData: "hospitalCapacity"
        },
        excludeFromStructure: true
    },
    {
        label: "New Tests",
        property: {
            name: "newTests",
            apiName: "newTestsByPublishDate",
            associatedData: "newTestsRollingAverage"
        }
    },
    {
        label: "Cumulative Tests",
        property: {
            name: "cumulativeTests",
            apiName: "cumTestsByPublishDate"
        }
    },
];


// export type Metric =
//     "Total Deaths" |
//     "Total Deaths Per Population" |
//     "New Deaths" |
//     "New Deaths Per Population" |
//     "Hospital Cases" |
//     "Hospital Capacity" |
//     "Hospital Utilisation";
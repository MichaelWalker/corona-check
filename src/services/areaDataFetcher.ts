import moment from "moment";
import {AreaType, fetchData} from "./govUkApiClient";

export interface DailyReport {
    date: string;
    moment: moment.Moment;
    timestamp: number;
    newCasesByPublishDate: number | null;
    newCasesBySpecimenDate: number | null;
    cumCasesByPublishDate: number | null;
    cumCasesBySpecimenDate: number | null;
    newAdmissions: number | null;
    cumAdmissions: number | null;
    newDeaths28DaysByPublishDate: number | null;
    newDeaths28DaysByDeathDate: number | null;
    cumDeaths28DaysByPublishDate: number | null;
    cumDeaths28DaysByDeathDate: number | null;
    plannedCapacityByPublishDate: number | null;
    hospitalCases: number | null;
}

const fields: (keyof DailyReport)[] = [
    "date",
    "newCasesByPublishDate",
    "newCasesBySpecimenDate",
    "cumCasesByPublishDate",
    "cumCasesBySpecimenDate",
    "newAdmissions",
    "cumAdmissions",
    "newDeaths28DaysByPublishDate",
    "newDeaths28DaysByDeathDate",
    "cumDeaths28DaysByPublishDate",
    "cumDeaths28DaysByDeathDate",
    "plannedCapacityByPublishDate",
    "hospitalCases",
];

export const fetchDataForArea = async (areaName: string, areaType: AreaType): Promise<DailyReport[]> => {
    return fetchData(areaType, fields, areaName);
};

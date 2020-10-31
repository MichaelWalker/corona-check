import moment from "moment";
import {fetchData} from "./govUkApiClient";
import {Figure} from "./processingHelpers";

export interface MapDataPoint {
    date: string;
    moment: moment.Moment;
    timestamp: number;
    areaCode: string;
    areaName: string;
    newCasesByPublishDate: Figure;
    cumCasesBySpecimenDate: Figure;
    cumCasesBySpecimenDateRate: Figure;
}

const fields: (keyof MapDataPoint)[] = [
    "date",
    "areaCode",
    "areaName",
    "newCasesByPublishDate",
    "cumCasesBySpecimenDate",
    "cumCasesBySpecimenDateRate",
];

export const fetchNationalData = async (): Promise<MapDataPoint[]> => {
    return await fetchData<MapDataPoint>("nation", fields);
};

export const fetchUtlaData = async (): Promise<MapDataPoint[]> => {
    return await fetchData<MapDataPoint>("utla", fields);
};

export const fetchLtlaData = async (): Promise<MapDataPoint[]> => {
    return await fetchData<MapDataPoint>("ltla", fields);
};

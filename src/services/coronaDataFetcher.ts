export interface RawData {
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

const BASE_URL = "https://api.coronavirus-staging.data.gov.uk";
const STRUCTURE = {
    dateString: "date",
    hash: "hash",
    casesNew: "newCasesBySpecimenDate",
    casesTotal: "cumCasesBySpecimenDate",
    casesTotalPerPopulation: "cumCasesBySpecimenDateRate",
    admissionsNew: "newAdmissions",
    admissionsTotal: "cumAdmissions",
    hospitalCases: "hospitalCases",
    hospitalCapacity: "plannedCapacityByPublishDate",
    deathsNew: "newDeaths28DaysByDeathDate",
    deathsTotal: "cumDeaths28DaysByDeathDate",
};

const getUrl = (areaName: string) => {
    const structureString = JSON.stringify(STRUCTURE);
    return `${BASE_URL}/v1/data?filters=areaName=${areaName}&structure=${structureString}`;
};

export const fetchDataForArea = async (areaName: string): Promise<RawData[]> => {
    const response = await fetch(getUrl(areaName));
    const json = await response.json();
    return json.data;
};
import moment from "moment";

interface RawData {
    dateString: string;
    hash: string;
    newCases: number;
    cumulativeCases: number;
    cumulativeCasesRate: number;
    newAdmissions: number;
    cumulativeAdmissions: number;
    hospitalCases: number;
    hospitalCapacity: number;
    newDeaths: number;
    cumulativeDeaths: number;
}

export type ProcessedData = RawData & {
    date: moment.Moment;
    newCasesRate: number;
    newAdmissionsRate: number;
    cumulativeAdmissionsRate: number;
    newDeathsRate: number;
    cumulativeDeathsRate: number;
    hospitalUtilisation: number;
}

const BASE_URL = "https://api.coronavirus-staging.data.gov.uk";
const STRUCTURE = {
    dateString: "date",
    hash: "hash",
    newCases: "newCasesBySpecimenDate",
    cumulativeCases: "cumCasesBySpecimenDate",
    cumulativeCasesRate: "cumCasesBySpecimenDateRate",
    newAdmissions: "newAdmissions",
    cumulativeAdmissions: "cumAdmissions",
    hospitalCases: "hospitalCases",
    hospitalCapacity: "plannedCapacityByPublishDate",
    newDeaths: "newDeaths28DaysByDeathDate",
    cumulativeDeaths: "cumDeaths28DaysByDeathDate",
};

const getUrl = (areaName: string) => {
    const structureString = JSON.stringify(STRUCTURE);
    return `${BASE_URL}/v1/data?filters=areaName=${areaName}&structure=${structureString}`;
};

export const fetchDataForArea = async (areaName: string): Promise<ProcessedData[]> => {
    const response = await fetch(getUrl(areaName));
    const json = await response.json();
    return deduplicate(json
        .data
        .map(processData)
        .sort(byDate));
};

const deduplicate = (input: ProcessedData[]): ProcessedData[] => {
    const uniqueData: ProcessedData[] = [];
    
    input.forEach(item => {
        if (uniqueData.length === 0) {
            uniqueData.push(item);
        }
        else {
            const previousItem = uniqueData[uniqueData.length - 1];
            if (!previousItem.date.isSame(item.date)) {
                uniqueData.push(item);
            }
        }
    });
    
    return uniqueData;
}; 

const processData = (rawData: RawData): ProcessedData => {
    const population = rawData.cumulativeCases / rawData.cumulativeCasesRate;
    return {
        ...rawData,
        date: moment(rawData.dateString),
        newCasesRate: rawData.newCases / population,
        newAdmissionsRate: rawData.newAdmissions / population,
        cumulativeAdmissionsRate: rawData.cumulativeAdmissions / population,
        newDeathsRate: rawData.newDeaths / population,
        cumulativeDeathsRate: rawData.cumulativeDeaths / population,
        hospitalUtilisation: rawData.hospitalCases / rawData.hospitalCapacity,
    }
};


const byDate = (a: ProcessedData, b: ProcessedData): number => {
    return a.date > b.date ? 1 : -1;
};
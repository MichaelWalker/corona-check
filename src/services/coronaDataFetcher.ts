import moment from "moment";

interface RawDailyReport {
    date: string;
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

const metricNames = {
    "date": "date",
    "newCasesByPublishDate": "newCasesByPublishDate",
    "newCasesBySpecimenDate": "newCasesBySpecimenDate",
    "cumCasesByPublishDate": "cumCasesByPublishDate",
    "cumCasesBySpecimenDate": "cumCasesBySpecimenDate",
    "newAdmissions": "newAdmissions",
    "cumAdmissions": "cumAdmissions",
    "newDeaths28DaysByPublishDate": "newDeaths28DaysByPublishDate",
    "newDeaths28DaysByDeathDate": "newDeaths28DaysByDeathDate",
    "cumDeaths28DaysByPublishDate": "cumDeaths28DaysByPublishDate",
    "cumDeaths28DaysByDeathDate": "cumDeaths28DaysByDeathDate",
    "plannedCapacityByPublishDate": "plannedCapacityByPublishDate",
    "hospitalCases": "hospitalCases",
};

export type DailyReport = RawDailyReport & { 
    moment: moment.Moment; 
    timestamp: number 
}

const BASE_URL = "https://api.coronavirus.data.gov.uk";

const getUrl = (areaName: string) => {
    const structureString = JSON.stringify(metricNames);
    return `${BASE_URL}/v1/data?filters=areaName=${areaName}&structure=${structureString}`;
};

export const makeApiRequest = async (areaName: string): Promise<RawDailyReport[]> => {
    const response = await fetch(getUrl(areaName));
    const json = await response.json();
    return json.data;
};

export const fetchDataForArea = async (areaName: string): Promise<DailyReport[]> => {
    const rawData = await makeApiRequest(areaName);
    
    const startDate = moment("01 March 2020");
    return deduplicate(rawData)
        .map(parseDate)
        .filter(dataPoint => dataPoint.moment.isSameOrAfter(startDate, "day"))
        .sort(byDate)
}

const deduplicate = (rawData: RawDailyReport[]): RawDailyReport[] => {
    const uniqueData: RawDailyReport[] = [];

    rawData.forEach(dailyReport => {
        if (!uniqueData.find(d => d.date === dailyReport.date)) {
            uniqueData.push(dailyReport);
        }
    });

    return uniqueData;
};

const parseDate = (rawDataPoint: RawDailyReport): DailyReport => {
    const parsedDate = moment(rawDataPoint.date);
    return {
        ...rawDataPoint,
        moment: parsedDate,
        timestamp: parsedDate.unix()
    }
};

const byDate = (a: DailyReport, b: DailyReport): number => {
    return a.moment > b.moment ? 1 : -1;
};
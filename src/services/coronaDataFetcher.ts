import moment from "moment";

interface RawDataFormat {
    date: number;
    newCasesBySpecimenDate: number;
    cumCasesBySpecimenDate: number;
}

export interface AreaData {
    date: moment.Moment;
    newCases: number;
    newCasesSevenDayAverage: number;
    cumulativeCases: number;
    cumulativeCasesSevenDayAverage: number;
}

const getUrl = (areaName: string) => {
    return `https://api.coronavirus-staging.data.gov.uk/v1/data?filters=areaName=${areaName}&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22,%22cumCasesBySpecimenDate%22:%22cumCasesBySpecimenDate%22%7D`;
};

export const fetchDataForArea = async (areaName: string): Promise<AreaData[]> => {
    const response = await fetch(getUrl(areaName));
    const json = await response.json();
    return processData(json.data);
};

const processData = (rawData: RawDataFormat[]): AreaData[] => {
    const processedData: AreaData[] = [];
    
    rawData
        .map(toAreaData)
        .sort(byDate)
        .forEach(input => {
            if (!containsData(processedData, input)) {
                processedData.push(input);
            } 
        });
    
    return processedData;
};

const containsData = (processedData: AreaData[], input: AreaData): boolean => {
    if (processedData.length === 0) {
        return false;
    }
    const previousEntry = processedData[processedData.length - 1];
    return previousEntry.date.isSame(input.date, "day");
};

const toAreaData = (rawData: RawDataFormat): AreaData => {
    return {
        date: moment(rawData.date),
        newCases: rawData.newCasesBySpecimenDate,
        newCasesSevenDayAverage: -1,
        cumulativeCases: rawData.cumCasesBySpecimenDate,
        cumulativeCasesSevenDayAverage: -1
    }
};

const byDate = (a: AreaData, b: AreaData): number => {
    return a.date > b.date ? 1 : -1;
};
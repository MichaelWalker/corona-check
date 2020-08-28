export interface AreaData {
    date: string;
    newCasesBySpecimenDate: number;
    cumCasesBySpecimenDate: number;
}

const getUrl = (areaName: string) => {
    return `https://api.coronavirus-staging.data.gov.uk/v1/data?filters=areaName=${areaName}&structure=%7B%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22newCasesBySpecimenDate%22:%22newCasesBySpecimenDate%22,%22cumCasesBySpecimenDate%22:%22cumCasesBySpecimenDate%22%7D`;
};

export const fetchDataForArea = async (areaName: string): Promise<AreaData[]> => {
    const response = await fetch(getUrl(areaName));
    const json = await response.json();
    console.log(json.length, areaName);
    return json.data;
};
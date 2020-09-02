import {RawDataPoint} from "./dataStructures";
import {METRICS} from "../config/options";

const BASE_URL = "https://api.coronavirus-staging.data.gov.uk";

const getStructure = (): {} => {
    let structure: any = {
        dateString: "date"
    };
    
    METRICS.forEach(metric => {
        structure[metric.byPublishedDate.name] = metric.byPublishedDate.apiName;
        if (metric.bySpecimenDate) {
            structure[metric.bySpecimenDate.name] = metric.bySpecimenDate.apiName;
        }
    });
    
    return structure;
};

const getUrl = (areaName: string) => {
    const structureString = JSON.stringify(getStructure());
    return `${BASE_URL}/v1/data?filters=areaName=${areaName}&structure=${structureString}`;
};

export const fetchDataForArea = async (areaName: string): Promise<RawDataPoint[]> => {
    const response = await fetch(getUrl(areaName));
    const json = await response.json();
    return json.data;
};
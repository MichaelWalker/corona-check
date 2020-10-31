import moment from "moment";

export type AreaType = "overview" | "nation" | "region" | "nhsRegion" | "utla" | "ltla";

interface ApiResponse<T> {
    data: T[];
    pagination: {
        next: string | null;
    }
}

interface HasDate {
    date: string;
    moment: moment.Moment;
    timestamp: number;
}

export const fetchData = async <T extends HasDate> (areaType: AreaType, fields: (keyof T)[], areaName?: string): Promise<T[]> => {
    const data: T[] = [];
    let page = 1;
    while (true) {
        const response = await makeApiRequest<T>(areaType, fields, page, areaName);
        console.log(response);
        data.push(...response.data || []);
        if (!response.pagination.next) {
            break;
        }
        page++;
    }
    return data
        .map(d => parseDate<T>(d))
        .filter(afterStartOfPandemic)
        .sort(byDate);
};

const baseUrl = "https://api.coronavirus.data.gov.uk/v1/data";

const makeApiRequest = async <T extends HasDate> (areaType: AreaType, fields: (keyof T)[], page: number, areaName?: string): Promise<ApiResponse<T>> => {
    const url = `${baseUrl}?page=${page}&${filterQueryParam(areaType, areaName)}&${structureQueryParam<T>(fields)}`;
    const response = await fetch(url);
    return await response.json();
};

const structureQueryParam = <T> (fields: (keyof T)[]): string => {
    return `structure={${fields.map(field => `"${field}":"${field}"`).join(",")}}`;
};

const filterQueryParam = (areaType: AreaType, areaName?: string): string => {
    let queryParam = `filters=areaType=${areaType}`;
    
    if (areaName) {
        queryParam += `;areaName=${areaName}`;
    }
    
    return queryParam;
};

const parseDate = <T extends HasDate> (dataPoint: any): T => {
    const parsedDate = moment(dataPoint.date);
    return {
        ...dataPoint,
        moment: parsedDate,
        timestamp: parsedDate.unix()
    }
};

const startDate = moment("01 March 2020");
const afterStartOfPandemic = (dataPoint: HasDate): boolean => {
      return dataPoint.moment.isSameOrAfter(startDate, "day");
};

const byDate = (a: HasDate, b: HasDate): number => {
    return a.moment > b.moment ? 1 : -1;
};
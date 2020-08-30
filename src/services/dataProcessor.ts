import moment from "moment";
import {fetchDataForArea, ProcessedData} from "./coronaDataFetcher";

interface R {
    last7Days: number;
    last14Days: number;
    last28Days: number;
}

export interface DataPoint {
    date: moment.Moment;
    new: number;
    cumulative: number;
    newRate: number;
    cumulativeRate: number;
    sevenDayAverage: number;
    sevenDayAverageRate: number;
}

interface HospitalCases {
    date: moment.Moment;
    cases: number;
    capacity: number;
    utilisation: number;
}

export interface AreaData {
    areaName: string;
    r: R;
    population: number;
    cases: DataPoint[];
    admissions: DataPoint[];
    deaths: DataPoint[];
    hospitalCases: HospitalCases[];
}

export const getAreaData = async (areaName: string): Promise<AreaData> => {
    const data = await fetchDataForArea(areaName);
    
    return {
        areaName: areaName,
        r: calculateR(data),
        population: calculatePopulation(data[0]),
        cases: calculateCases(data),
        admissions: calculateAdmissions(data),
        deaths: calculateDeaths(data),
        hospitalCases: calculateHospitalCases(data),
    };
};

const calculateR = (data: ProcessedData[]): R => {
    return {
        last7Days: -1,
        last14Days: -1,
        last28Days: -1,
    }
};

const calculatePopulation = (data: ProcessedData): number => {
    return -1;  
};

const calculateSevenDayAverage = (data: ProcessedData[], index: number, metric: string): number => {
    return -1;
};

const calculateCases = (data: ProcessedData[]): DataPoint[] => {
    return data.map((dataPoint, index) => {
        const population = calculatePopulation(dataPoint);
        const sevenDayAverage = calculateSevenDayAverage(data, index, 'newCases');
        return {
            date: dataPoint.date,
            new: dataPoint.newCases,
            newRate: dataPoint.newCasesRate,
            cumulative: dataPoint.cumulativeCases,
            cumulativeRate: dataPoint.cumulativeCases,
            sevenDayAverage: sevenDayAverage,
            sevenDayAverageRate: sevenDayAverage * 100000 / population,
        }
    });
};

const calculateAdmissions = (data: ProcessedData[]): DataPoint[] => {
    return data.map((dataPoint, index) => {
        const population = calculatePopulation(dataPoint);
        const sevenDayAverage = calculateSevenDayAverage(data, index, 'newAdmissions');
        return {
            date: dataPoint.date,
            new: dataPoint.newAdmissions,
            newRate: dataPoint.newAdmissionsRate,
            cumulative: dataPoint.cumulativeAdmissions,
            cumulativeRate: dataPoint.cumulativeAdmissionsRate,
            sevenDayAverage: sevenDayAverage,
            sevenDayAverageRate: sevenDayAverage * 100000 / population,
        }
    });
};

const calculateDeaths = (data: ProcessedData[]): DataPoint[] => {
    return data.map((dataPoint, index) => {
        const population = calculatePopulation(dataPoint);
        const sevenDayAverage = calculateSevenDayAverage(data, index, 'newDeaths');
        return {
            date: dataPoint.date,
            new: dataPoint.newDeaths,
            newRate: dataPoint.newDeathsRate,
            cumulative: dataPoint.cumulativeDeaths,
            cumulativeRate: dataPoint.cumulativeDeathsRate,
            sevenDayAverage: sevenDayAverage,
            sevenDayAverageRate: sevenDayAverage * 100000 / population,
        }
    });
};

const calculateHospitalCases = (data: ProcessedData[]): HospitalCases[] => {
    return data.map(dataPoint => {
        return {
            date: dataPoint.date,
            cases: dataPoint.hospitalCases,
            capacity: dataPoint.hospitalCapacity,
            utilisation: dataPoint.hospitalUtilisation
        }
    });
};
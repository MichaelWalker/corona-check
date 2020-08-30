import moment from "moment";
import {fetchDataForArea, RawData} from "./coronaDataFetcher";

interface R {
    last7Days: number;
    last14Days: number;
    last28Days: number;
}

export interface DataPoint {
    date: moment.Moment;
    
    // cases
    casesNew: number;
    casesTotal: number;
    casesNewPerPopulation: number;
    casesTotalPerPopulation: number;
    casesRollingAverage: number;
    casesRollingAveragePerPopulation: number;
    
    // admissions
    admissionsNew: number;
    admissionsTotal: number;
    admissionsNewPerPopulation: number;
    admissionsTotalPerPopulation: number;
    admissionsRollingAverage: number;
    admissionsRollingAveragePerPopulation: number;
    
    // deaths
    deathsNew: number;
    deathsTotal: number;
    deathsNewPerPopulation: number;
    deathsTotalPerPopulation: number;
    deathsRollingAverage: number;
    deathsRollingAveragePerPopulation: number;
    
    // hospitalisation
    hospitalCases: number;
    hospitalCapacity: number;
    hospitalUtilisation: number;
}

export type TimeSeries = DataPoint[];

export interface AreaData {
    areaName: string;
    r: R;
    population: number;
    timeSeries: TimeSeries;
}

export const getAreaData = async (areaName: string): Promise<AreaData> => {
    const rawData = await fetchDataForArea(areaName);
    const data = deduplicate(rawData);
    const timeSeries = calculateTimeSeries(data);
    
    return {
        areaName: areaName,
        r: calculateR(timeSeries),
        population: calculatePopulation(timeSeries[0]),
        timeSeries: timeSeries,
    };
};

const calculateR = (timeSeries: TimeSeries): R => {
    return {
        last7Days: -1,
        last14Days: -1,
        last28Days: -1,
    }
};

const calculatePopulation = (dataPoint: DataPoint): number => {
    return 100000 * dataPoint.casesTotal / dataPoint.casesTotalPerPopulation;  
};

const calculateTimeSeries = (data: RawData[]): TimeSeries => {
    return data
        .map(toDataPoint)
        .sort(byDate);
};

const toDataPoint = (dataPoint: RawData): DataPoint => {
    const populationRatio = dataPoint.casesTotal / dataPoint.casesTotalPerPopulation;
    const casesRollingAverage = 0;
    const admissionsRollingAverage = 0;
    const deathsRollingAverage = 0;
    
    return {
        ...dataPoint,

        date: moment(dataPoint.dateString),

        casesNewPerPopulation: dataPoint.casesNew / populationRatio,
        casesRollingAverage: casesRollingAverage,
        casesRollingAveragePerPopulation: casesRollingAverage / populationRatio,

        admissionsNewPerPopulation: dataPoint.admissionsNew / populationRatio,
        admissionsTotalPerPopulation: dataPoint.admissionsTotal / populationRatio,
        admissionsRollingAverage: admissionsRollingAverage,
        admissionsRollingAveragePerPopulation: admissionsRollingAverage / populationRatio,

        deathsNewPerPopulation: dataPoint.deathsNew / populationRatio,
        deathsTotalPerPopulation: dataPoint.deathsTotal / populationRatio,
        deathsRollingAverage: deathsRollingAverage,
        deathsRollingAveragePerPopulation: deathsRollingAverage / populationRatio,

        hospitalUtilisation: (dataPoint.hospitalCapacity)? dataPoint.hospitalCases * 100 / dataPoint.hospitalCapacity : 0
    }  
};

const byDate = (a: DataPoint, b: DataPoint) => {
    return a.date > b.date ? 1 : -1;
};

const deduplicate = (rawData: RawData[]): RawData[] => {
    const uniqueData: RawData[] = [];
    
    rawData.forEach(dataPoint => {
        if (!uniqueData.find(item => item.hash === dataPoint.hash)) {
            uniqueData.push(dataPoint);
        }
    });
    
    return uniqueData;
};

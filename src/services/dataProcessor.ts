﻿import {fetchDataForArea} from "./coronaDataFetcher";
import {DataPoint, R, RawDataPoint, TimeSeries} from "./dataStructures";
import {calculateR} from "./rCalculator";
import {calculateTimeSeries} from "./timeSeriesCalculator";

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

const calculatePopulation = (dataPoint: DataPoint): number => {
    return 100000 * dataPoint.casesTotal / dataPoint.casesTotalPerPopulation;  
};

const deduplicate = (rawData: RawDataPoint[]): RawDataPoint[] => {
    const uniqueData: RawDataPoint[] = [];
    
    rawData.forEach(dataPoint => {
        if (!uniqueData.find(item => item.hash === dataPoint.hash)) {
            uniqueData.push(dataPoint);
        }
    });
    
    return uniqueData;
};

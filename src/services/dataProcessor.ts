import {fetchDataForArea} from "./coronaDataFetcher";
import {DataPoint, RawDataPoint, TimeSeries} from "./dataStructures";
import {calculateTimeSeries} from "./timeSeriesCalculator";
import {getStats, Stats} from "./statService";

export interface AreaData {
    areaName: string;
    population: number;
    timeSeries: TimeSeries;
    stats: Stats;
}

export const getAreaData = async (areaName: string): Promise<AreaData> => {
    const rawData = await fetchDataForArea(areaName);
    const data = deduplicate(rawData);
    const timeSeries = calculateTimeSeries(data);
    
    return {
        areaName: areaName,
        population: calculatePopulation(timeSeries[0]),
        timeSeries: timeSeries,
        stats: getStats(timeSeries)
    };
};

const calculatePopulation = (dataPoint: DataPoint): number => {
    return 0;
    // return 100000 * dataPoint.casesTotal / dataPoint.casesTotalPerPopulation;
};

const deduplicate = (rawData: RawDataPoint[]): RawDataPoint[] => {
    const uniqueData: RawDataPoint[] = [];
    
    rawData.forEach(dataPoint => {
        if (!uniqueData.find(d => d.dateString === dataPoint.dateString)) {
            uniqueData.push(dataPoint);
        }
    });
    
    return uniqueData;
};

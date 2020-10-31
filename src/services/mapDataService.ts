import {fetchNationalData, fetchUtlaData, MapDataPoint} from "./mapDataFetcher";
import {Figure} from "./processingHelpers";
import moment from "moment";

export interface MapData {
    [Key: string]: Figure
}

export const getNationalMapData = async (): Promise<MapData> => {
    const data = await fetchNationalData();
    return toMapData(data);
};

export const getUtlaMapData = async (): Promise<MapData> => {
    const data = await fetchUtlaData();
    return toMapData(data);
};

const toMapData = (data: MapDataPoint[]): MapData => {
    const twoWeeksAgo = moment().subtract(2, "weeks");
    const lastTwoWeeksData = data.filter(d => d.moment.isSameOrAfter(twoWeeksAgo, "day"));

    const uniqueCodes = getUniqueCodes(lastTwoWeeksData);
    const mapData: MapData = {};

    uniqueCodes.forEach(code => {
        const figuresForCode = lastTwoWeeksData
            .filter(d => d.areaCode === code)
            .map(newCaseRate);
        mapData[code] = average(figuresForCode);
    });

    return mapData;
};

const newCaseRate = (dataPoint: MapDataPoint): Figure => {
    if (dataPoint.newCasesByPublishDate === null 
        || dataPoint.cumCasesBySpecimenDate === null 
        || dataPoint.cumCasesBySpecimenDateRate === null) {
        return null;
    }
    
    const population = dataPoint.cumCasesBySpecimenDate / dataPoint.cumCasesBySpecimenDateRate;
    return dataPoint.newCasesByPublishDate / population;
};

const getUniqueCodes = (data: MapDataPoint[]): string[] => {
    const uniqueCodes: string[] = [];
    
    data.forEach(dataPoint => {
        if (!uniqueCodes.includes(dataPoint.areaCode)) {
            uniqueCodes.push(dataPoint.areaCode);
        } 
    });
    
    return uniqueCodes;
};

const average = (figures: Figure[]): Figure => {
    const nonNullFigures = figures.filter(f => f !== null) as number[];
    
    if (nonNullFigures.length === 0) {
        return null;
    }
    
    const sum = nonNullFigures.reduce((a, b) => a + b);
    return sum / nonNullFigures.length;
};

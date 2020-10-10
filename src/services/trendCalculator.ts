import {Figure} from "./dataProcessor";

interface DataPoint {
    value: number;
    day: number;
}

export interface Trend {
    weeklyIncrease: number;
    weeklyPercentageIncrease: number;
}

export const get14DayTrend = (values: Figure[]): Trend | null => {
    const dataPoints = getLast14Values(values)
        .map(toDataPoint)
        .filter(notNull) as DataPoint[];

    if (dataPoints.length < 5) {
        return null;
    }

    const averageValue = average(dataPoints.map(point => point.value));
    const averageDay = average(dataPoints.map(point => point.day));
    
    if (averageValue < 5) {
        return null;
    }
    
    const typicalDailyIncrease = getNumerator(dataPoints, averageValue, averageDay) / getDenominator(dataPoints, averageValue, averageDay);
    
    return {
        weeklyIncrease: typicalDailyIncrease * 7,
        weeklyPercentageIncrease: typicalDailyIncrease * 700 / averageValue,
    }
};

const getLast14Values = (values: Figure[]) => {
    if (values.length <= 14) {
        return values;
    }
    return values.slice(values.length - 14, values.length);
};

const toDataPoint = (value: number | null, index : number): DataPoint | null => {
    if (value === null) {
        return null;
    }
    return {
        value,
        day: index
    }
}

const notNull = (dataPoint: DataPoint | null): boolean => {
    return dataPoint !== null;
}

const average = (numbers: number[]): number => {
    const sum = numbers.reduce((a, b) => a + b);
    return sum / numbers.length;
}

const getNumerator = (dataPoints: DataPoint[], averageValue: number, averageDay: number): number => {
    return dataPoints
        .map(dataPoint => (dataPoint.day - averageDay) * (dataPoint.value - averageValue))
        .reduce((a, b) => a + b);
}

const getDenominator = (dataPoints: DataPoint[], averageValue: number, averageDay: number): number => {
    return dataPoints
        .map(dataPoint => (dataPoint.day - averageDay) * (dataPoint.day - averageDay))
        .reduce((a, b) => a + b);
}
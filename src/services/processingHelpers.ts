import {DailyReport} from "./coronaDataFetcher";
import {OverviewStats, Stat} from "./statService";
import moment from "moment";

export type Figure = number | null;

export interface MetricDataPoint {
    moment: moment.Moment;
    timestamp: number;
    value: Figure;
    rollingAverage?: Figure | undefined;
}

export interface Metric {
    label: string;
    data: MetricDataPoint[] | null;
}

export interface MetricCategory {
    metrics: Metric[];
    headlineStat: Stat;
    overviewStats: OverviewStats;
}

export const getMetricDataWithRollingAverage = (dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): MetricDataPoint[] | null => {
    const allValues = dailyReports.map(getValue);

    if (!sufficientData(allValues)) {
        return null;
    }

    return dailyReports.map((dailyReport, index) => {
        const lastWeeksValues = valuesForLastSevenDays(allValues, index);
        return {
            moment: dailyReport.moment,
            timestamp: dailyReport.timestamp,
            value: getValue(dailyReport),
            rollingAverage: getRollingAverages(lastWeeksValues)
        }
    })
};

export const getMetricDataWithoutRollingAverage = (dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): MetricDataPoint[] | null => {
    const allValues = dailyReports.map(getValue);

    if (!sufficientData(allValues)) {
        return null;
    }

    return dailyReports.map((dailyReport) => {
        return {
            moment: dailyReport.moment,
            timestamp: dailyReport.timestamp,
            value: getValue(dailyReport),
        }
    })
};

const sufficientData = (allValues: Figure[]) => {
    const nonNullValues = allValues.filter(value => value !== null);
    return nonNullValues.length >= 5;
};

const valuesForLastSevenDays = (values: Figure[], index: number) => {
    if (index <= 7) {
        return values.slice(0, index);
    }
    return values.slice(index - 6, index + 1);
};

const getRollingAverages = (values: Figure[]): Figure => {
    if (values[values.length - 1] === null) {
        // if the current day's value is null, then the rolling average should be null too.
        return null;
    }

    const nonNullValues = values.filter(value => value !== null) as number[];

    if (nonNullValues.length === 0) {
        return null;
    }

    const sum = nonNullValues.reduce((a, b) => a + b);
    return sum / nonNullValues.length;
};
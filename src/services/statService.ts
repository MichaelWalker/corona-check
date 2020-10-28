import {DailyReport} from "./coronaDataFetcher";
import {get14DayTrend} from "./trendCalculator";
import moment from "moment";
import {Figure} from "./processingHelpers";

export interface Stat {
    label: string;
    value: Figure;
    moment: moment.Moment | null;
    trend: Figure;
}

export interface OverviewStat {
    label: string;
    value: Figure;
}

export interface OverviewStats {
    lastUpdated: moment.Moment | null;
    stats: OverviewStat[];
}

export const getStat = (label: string, dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): Stat => {
    const mostRecentReport = getMostRecentReport(dailyReports, getValue);
    if (mostRecentReport === null) {
        return {
            label: label,
            value: null,
            moment: null,
            trend: null,
        }
    }

    return {
        label: label,
        value: getValue(mostRecentReport),
        moment: mostRecentReport.moment,
        trend: get14DayTrend(dailyReports.map(getValue)),
    }
};

export const getMostRecentFigure = (dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): Figure => {
    const mostRecentReport = getMostRecentReport(dailyReports, getValue);
    
    if (!mostRecentReport) {
        return null;
    }
    
    return getValue(mostRecentReport);
};

export const getMostRecentReport = (dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): DailyReport | null => {
    const nonNullReports = dailyReports.filter(dailyReport => getValue(dailyReport) !== null);

    if (nonNullReports.length === 0) {
        return null;
    }

    return nonNullReports.slice(-1)[0];
};

import {DailyReport} from "./coronaDataFetcher";
import {
    Figure,
    getMetricDataWithoutRollingAverage,
    getMetricDataWithRollingAverage, Metric,
    MetricCategory,
} from "./processingHelpers";
import {getMostRecentFigure, getMostRecentReport, getStat, OverviewStats, Stat} from "./statService";
import {get14DayTrend} from "./trendCalculator";
import moment from "moment";

export const getDeathData = (dailyReports: DailyReport[]): MetricCategory => {
    return {
        metrics: getMetrics(dailyReports),
        headlineStat: getHeadlineStat(dailyReports),
        overviewStats: getOverview(dailyReports),
    }
};

const getMetrics = (dailyReports: DailyReport[]): Metric[] => {
    return [
        {
            label: "New Deaths (by best available)",
            data: getMetricDataWithRollingAverage(dailyReports, getBestDeathFigure),
        },
        {
            label: "New Deaths (by death date)",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.newDeaths28DaysByDeathDate)
        },
        {
            label: "New Deaths (by publish date)",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.newDeaths28DaysByPublishDate),
        },
        {
            label: "Cumulative Deaths (by death date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumDeaths28DaysByDeathDate),
        },
        {
            label: "Cumulative Deaths (by publish date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumDeaths28DaysByPublishDate)
        }
    ]
};

const getHeadlineStat = (dailyReports: DailyReport[]): Stat => {
    return getStat("Deaths", dailyReports, dailyReport => dailyReport.newDeaths28DaysByPublishDate);
};

const getOverview = (dailyReports: DailyReport[]): OverviewStats => {
    const latestReport = getMostRecentReport(dailyReports, report => report.newDeaths28DaysByPublishDate);

    return {
        lastUpdated: latestReport ? latestReport.moment : null,
        stats: [
            {label: "New", value: getMostRecentFigure(dailyReports, report => report.newDeaths28DaysByPublishDate)},
            {label: "Total", value: getMostRecentFigure(dailyReports, report => report.cumDeaths28DaysByDeathDate)},
            {label: "Trend", value: get14DayTrend(dailyReports.map(report => report.newDeaths28DaysByPublishDate))},
        ]
    }
};

const getBestDeathFigure = (dailyReport: DailyReport): Figure => {
    if (dailyReport.moment.isBefore(moment().subtract(5, "days"))) {
        // For older data, specimen date is more reliable than publish date.
        return dailyReport.newDeaths28DaysByDeathDate !== null ? dailyReport.newDeaths28DaysByDeathDate : dailyReport.newDeaths28DaysByPublishDate;
    }
    // but for data from the last couple of days the publish date is more likely to be up to date, so use that where possible.
    return dailyReport.newDeaths28DaysByPublishDate !== null ? dailyReport.newDeaths28DaysByPublishDate : dailyReport.newDeaths28DaysByDeathDate;
};
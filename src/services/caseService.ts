import {
    Figure,
    getMetricDataWithoutRollingAverage,
    getMetricDataWithRollingAverage, Metric,
    MetricCategory
} from "./processingHelpers";
import moment from "moment";
import {getMostRecentFigure, getMostRecentReport, getStat, OverviewStats, Stat} from "./statService";
import {get14DayTrend} from "./trendCalculator";
import {DailyReport} from "./areaDataFetcher";

export const getCaseData = (dailyReports: DailyReport[]): MetricCategory => {
    return {
        metrics: getMetrics(dailyReports),
        headlineStat: getHeadlineStat(dailyReports),
        overviewStats: getOverview(dailyReports),
    }  
};

const getMetrics = (dailyReports: DailyReport[]): Metric[] => {
    return [
        {
            label: "New Cases (by best available)",
            data: getMetricDataWithRollingAverage(dailyReports, getBestCaseFigure),
        },
        {
            label: "New Cases (by specimen date)",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.newCasesBySpecimenDate)
        },
        {
            label: "New Cases (by publish date)",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.newCasesByPublishDate),
        },
        {
            label: "Cumulative Cases (by specimen date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumCasesBySpecimenDate),
        },
        {
            label: "Cumulative Cases (by publish date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumCasesByPublishDate)
        }
    ]
};

const getHeadlineStat = (dailyReports: DailyReport[]): Stat => {
    return getStat("Cases", dailyReports, dailyReport => dailyReport.newCasesByPublishDate)
};

const getOverview = (dailyReports: DailyReport[]): OverviewStats => {
    const latestReport = getMostRecentReport(dailyReports, report => report.newCasesByPublishDate);
    return {
        lastUpdated: latestReport ? latestReport.moment : null,
        stats: [
            {label: "New", value: getMostRecentFigure(dailyReports, report => report.newCasesByPublishDate)},
            {label: "Total", value: getMostRecentFigure(dailyReports, report => report.cumCasesBySpecimenDate)},
            {label: "Trend", value: get14DayTrend(dailyReports.map(report => report.newCasesByPublishDate))},
        ]
    }
};

const getBestCaseFigure = (dailyReport: DailyReport): Figure => {
    if (dailyReport.moment.isBefore(moment().subtract(5, "days"))) {
        // For older data, specimen date is more reliable than publish date.
        return dailyReport.newCasesBySpecimenDate !== null ? dailyReport.newCasesBySpecimenDate : dailyReport.newCasesByPublishDate;
    }
    // but for data from the last couple of days the publish date is more likely to be up to date, so use that where possible.
    return dailyReport.newCasesByPublishDate !== null ? dailyReport.newCasesByPublishDate : dailyReport.newCasesBySpecimenDate;
};

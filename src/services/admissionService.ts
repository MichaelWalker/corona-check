import {DailyReport} from "./coronaDataFetcher";
import {getMostRecentFigure, getMostRecentReport, getStat, OverviewStats, Stat} from "./statService";
import {getMetricDataWithRollingAverage, Metric, MetricCategory} from "./processingHelpers";
import {get14DayTrend} from "./trendCalculator";

export const getAdmissionsData = (dailyReports: DailyReport[]): MetricCategory => {
    return {
        metrics: getMetrics(dailyReports),
        headlineStat: getHeadlineStat(dailyReports),
        overviewStats: getOverview(dailyReports),
    }
};

const getMetrics = (dailyReports: DailyReport[]): Metric[] => {
    return [
        {
            label: "New Admissions",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.newAdmissions),
        },
        {
            label: "Cumulative Admissions",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.cumAdmissions),
        },
    ]
};

const getHeadlineStat = (dailyReports: DailyReport[]): Stat => {
    return getStat("Admissions", dailyReports, dailyReport => dailyReport.newAdmissions);
};

const getOverview = (dailyReports: DailyReport[]): OverviewStats => {
    const latestReport = getMostRecentReport(dailyReports, report => report.newAdmissions);
    return {
        lastUpdated: latestReport ? latestReport.moment : null,
        stats: [
            { label: "New", value: getMostRecentFigure(dailyReports, report => report.newAdmissions) },
            { label: "Total", value: getMostRecentFigure(dailyReports, report => report.cumAdmissions) },
            { label: "Trend", value: get14DayTrend(dailyReports.map(report => report.newAdmissions)) },
        ]
    }
};

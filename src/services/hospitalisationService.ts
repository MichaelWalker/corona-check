import {DailyReport} from "./coronaDataFetcher";
import {getMostRecentFigure, getMostRecentReport, getStat, OverviewStats, Stat} from "./statService";
import {Figure, getMetricDataWithRollingAverage, Metric, MetricCategory} from "./processingHelpers";
import {get14DayTrend} from "./trendCalculator";

export const getHospitalisationData = (dailyReports: DailyReport[]): MetricCategory => {
    return {
        metrics: getMetrics(dailyReports),
        headlineStat: getHeadlineStat(dailyReports),
        overviewStats: getOverview(dailyReports),
    }
};

const getMetrics = (dailyReports: DailyReport[]): Metric[] => {
    return [
        {
            label: "Number of people in hospital",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.hospitalCases),
        },
        {
            label: "Planned hospital capacity",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.plannedCapacityByPublishDate)
        },
        {
            label: "Spare hospital capacity",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => {
                if (dailyReport.plannedCapacityByPublishDate === null || dailyReport.hospitalCases === null) {
                    return null;
                }
                return dailyReport.plannedCapacityByPublishDate - dailyReport.hospitalCases;
            })
        },
        {
            label: "% of hospital capacity used",
            data: getMetricDataWithRollingAverage(dailyReports, getPercentageHospitalCapacity),
        },
    ];
};

const getHeadlineStat = (dailyReports: DailyReport[]): Stat => {
    return getStat("In Hospital", dailyReports, dailyReport => dailyReport.hospitalCases);
};

const getOverview = (dailyReports: DailyReport[]): OverviewStats => {
    const latestReport = getMostRecentReport(dailyReports, report => report.hospitalCases);

    return {
        lastUpdated: latestReport ? latestReport.moment : null,
        stats: [
            {label: "People In Hospital", value: getMostRecentFigure(dailyReports, report => report.hospitalCases)},
            {label: "% of hospital capacity", value: getMostRecentFigure(dailyReports, getPercentageHospitalCapacity)},
            {label: "Trend", value: get14DayTrend(dailyReports.map(report => report.hospitalCases))},
        ]
    }
};

const getPercentageHospitalCapacity = (dailyReport: DailyReport): Figure => {
    if (dailyReport.plannedCapacityByPublishDate === null || dailyReport.hospitalCases === null) {
        return null;
    }
    return dailyReport.hospitalCases * 100 / dailyReport.plannedCapacityByPublishDate;
};

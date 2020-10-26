import {DailyReport, fetchDataForArea} from "./coronaDataFetcher";
import moment from "moment";
import {get14DayTrend} from "./trendCalculator";


export type Figure = number | null;

export interface Stat {
    label: string;
    value: Figure;
    moment: moment.Moment | null;
    trend: Figure;
}

export interface MetricDataPoint {
    moment: moment.Moment;
    timestamp: number;
    value: Figure;
    rollingAverage?: Figure | undefined;
}

export interface Metric {
    label: string;
    data: MetricDataPoint[] | null;
    stat?: Stat | undefined;
}

export interface AreaData {
    areaName: string;
    cases: Metric[];
    admissions: Metric[];
    deaths: Metric[];
    hospitalisation: Metric[];
}

export const getAreaData = async (areaName: string): Promise<AreaData> => {
    const dailyReports = await fetchDataForArea(areaName);
    
    return {
        areaName: areaName,
        cases: getCasesData(dailyReports),
        admissions: getAdmissionsData(dailyReports),
        deaths: getDeathsData(dailyReports),
        hospitalisation: getHospitalisationData(dailyReports),
    }
};

const getCasesData = (dailyReports: DailyReport[]): Metric[] => {
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
            stat: getStat("New Cases", dailyReports, dailyReport => dailyReport.newCasesByPublishDate, true)
        },
        {
            label: "Cumulative Cases (by specimen date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumCasesBySpecimenDate),
            stat: getStat("New Cases", dailyReports, dailyReport => dailyReport.cumCasesBySpecimenDate, false)
        },
        {
            label: "Cumulative Cases (by publish date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumCasesByPublishDate)
        }
    ]
};

const getAdmissionsData = (dailyReports: DailyReport[]): Metric[] => {
    return [
        {
            label: "New Admissions",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.newAdmissions),
            stat: getStat("New Admissions", dailyReports, dailyReport => dailyReport.newAdmissions, true),
        },
        {
            label: "Cumulative Admissions",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.cumAdmissions),
            stat: getStat("Cumulative Admissions", dailyReports, dailyReport => dailyReport.cumAdmissions, false)
        },
    ];
};

const getDeathsData = (dailyReports: DailyReport[]): Metric[] => {
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
            stat: getStat("New Deaths", dailyReports, dailyReport => dailyReport.newDeaths28DaysByPublishDate, true),
        },
        {
            label: "Cumulative Deaths (by death date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumDeaths28DaysByDeathDate),
            stat: getStat("Cumulative Deaths", dailyReports, dailyReport => dailyReport.cumDeaths28DaysByDeathDate, false),
        },
        {
            label: "Cumulative Deaths (by publish date)",
            data: getMetricDataWithoutRollingAverage(dailyReports, dailyReport => dailyReport.cumDeaths28DaysByPublishDate)
        }
    ]
};

const getHospitalisationData = (dailyReports: DailyReport[]): Metric[] => {
    return [
        {
            label: "Number of people in hospital",
            data: getMetricDataWithRollingAverage(dailyReports, dailyReport => dailyReport.hospitalCases),
            stat: getStat("People in Hospital", dailyReports, dailyReport => dailyReport.hospitalCases, true),
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
            stat: getStat("% of hospital capacity", dailyReports, getPercentageHospitalCapacity, false),
        },
    ];
};

const getPercentageHospitalCapacity = (dailyReport: DailyReport): Figure => {
    if (dailyReport.plannedCapacityByPublishDate === null || dailyReport.hospitalCases === null) {
        return null;
    }
    return dailyReport.hospitalCases * 100 / dailyReport.plannedCapacityByPublishDate;
};

const getBestCaseFigure = (dailyReport: DailyReport): Figure => {
    if (dailyReport.moment.isBefore(moment().subtract(5, "days"))) {
        // For older data, specimen date is more reliable than publish date.
        return dailyReport.newCasesBySpecimenDate !== null ? dailyReport.newCasesBySpecimenDate : dailyReport.newCasesByPublishDate;
    }
    // but for data from the last couple of days the publish date is more likely to be up to date, so use that where possible.
    return dailyReport.newCasesByPublishDate !== null ? dailyReport.newCasesByPublishDate : dailyReport.newCasesBySpecimenDate;
};

const getBestDeathFigure = (dailyReport: DailyReport): Figure => {
    if (dailyReport.moment.isBefore(moment().subtract(5, "days"))) {
        // For older data, specimen date is more reliable than publish date.
        return dailyReport.newDeaths28DaysByDeathDate !== null ? dailyReport.newDeaths28DaysByDeathDate : dailyReport.newDeaths28DaysByPublishDate;
    }
    // but for data from the last couple of days the publish date is more likely to be up to date, so use that where possible.
    return dailyReport.newDeaths28DaysByPublishDate !== null ? dailyReport.newDeaths28DaysByPublishDate : dailyReport.newDeaths28DaysByDeathDate;
};

const getMetricDataWithRollingAverage = (dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): MetricDataPoint[] | null => {
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

const getMetricDataWithoutRollingAverage = (dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): MetricDataPoint[] | null => {
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

const valuesForLastSevenDays = (values: Figure[], index: number) => {
    if (index <= 7) {
        return values.slice(0, index);
    }
    return values.slice(index - 6, index + 1);
};

const getStat = (label: string, dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure, showTrend: boolean): Stat => {
    const mostRecentReport = getMostRecentFigure(dailyReports, getValue);
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
        trend: showTrend ? get14DayTrend(dailyReports.map(getValue)) : null
    }
};

const getMostRecentFigure = (dailyReports: DailyReport[], getValue: (dailyReport: DailyReport) => Figure): DailyReport | null => {
    const nonNullReports = dailyReports.filter(dailyReport => getValue(dailyReport) !== null);
    
    if (nonNullReports.length === 0) {
        return null;
    }
    
    return nonNullReports.slice(-1)[0];
};

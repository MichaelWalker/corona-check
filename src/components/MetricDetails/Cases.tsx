import React from "react";
import {MetricDetails, PlotOption} from "./MetricDetails";
import {FunctionComponent} from "react";
import {AreaData} from "../../services/dataProcessor";

const plotOptions: PlotOption[] = [
    { label: "Daily (best available data)", value: { chartType: "bar", key: "newCases", rollingAverageKey: "newCasesRollingAverage" } },
    { label: "Daily (by publish date)", value: { chartType: "bar", key: "newCasesByPublishDate", rollingAverageKey: "newCasesByPublishDateRollingAverage" } },
    { label: "Daily (by specimen date)", value: { chartType: "bar", key: "newCasesBySpecimenDate", rollingAverageKey: "newCasesBySpecimenDateRollingAverage" } },
    { label: "Cumulative (by publish date)", value: { chartType: "area", key: "cumulativeCasesByPublishDate" } },
    { label: "Cumulative (by specimen date)", value: { chartType: "area", key: "cumulativeCasesBySpecimenDate" } },
];

interface CasesProps {
    data: AreaData | undefined;
}

export const Cases: FunctionComponent<CasesProps> = ({data}) => {
    return <MetricDetails name={"Cases"} data={data} plotOptions={plotOptions} statCategory={data?.stats.cases}/>
};
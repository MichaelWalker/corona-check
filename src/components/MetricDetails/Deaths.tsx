import React from "react";
import {MetricDetails, PlotOption} from "./MetricDetails";
import {FunctionComponent} from "react";
import {AreaData} from "../../services/dataProcessor";

const plotOptions: PlotOption[] = [
    { label: "Daily (best available data)", value: { chartType: "bar", key: "newDeaths", rollingAverageKey: "newDeathsRollingAverage" } },
    { label: "Daily (by publish date)", value: { chartType: "bar", key: "newDeathsByPublishDate", rollingAverageKey: "newDeathsByPublishDateRollingAverage" } },
    { label: "Daily (by death date)", value: { chartType: "bar", key: "newDeathsByDeathDate", rollingAverageKey: "newDeathsByDeathDateRollingAverage" } },
    { label: "Cumulative (by publish date)", value: { chartType: "area", key: "cumulativeDeathsByPublishDate" } },
    { label: "Cumulative (by death date)", value: { chartType: "area", key: "cumulativeDeathsByDeathDate" } },
];

interface DeathsProps {
    data: AreaData | undefined;
}

export const Deaths: FunctionComponent<DeathsProps> = ({data}) => {
    return <MetricDetails name={"Deaths"} data={data} plotOptions={plotOptions} statCategory={data?.stats.deaths}/>
};
import React from "react";
import {MetricDetails, PlotOption} from "./MetricDetails";
import {FunctionComponent} from "react";
import {AreaData} from "../../services/dataProcessor";

const plotOptions: PlotOption[] = [
    { label: "Daily", value: { chartType: "bar", key: "newAdmissions", rollingAverageKey: "newAdmissionsRollingAverage" } },
    { label: "Cumulative", value: { chartType: "area", key: "cumulativeAdmissions" } },
];

interface AdmissionsProps {
    data: AreaData | undefined;
}

export const Admissions: FunctionComponent<AdmissionsProps> = ({data}) => {
    return <MetricDetails name={"Admissions"} data={data} plotOptions={plotOptions} statCategory={data?.stats.admissions}/>
};
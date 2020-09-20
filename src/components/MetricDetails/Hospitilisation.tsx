import React from "react";
import {MetricDetails, PlotOption} from "./MetricDetails";
import {FunctionComponent} from "react";
import {AreaData} from "../../services/dataProcessor";

const plotOptions: PlotOption[] = [
    { label: "People In Hospital", value: { chartType: "area", key: "peopleInHospital" } },
    { label: "Hospital Capacity", value: { chartType: "area", key: "hospitalCapacity" } },
];

interface HospitalisationProps {
    data: AreaData | undefined;
}

export const Hospitalisation: FunctionComponent<HospitalisationProps> = ({data}) => {
    return <MetricDetails name={"Hospitalisation"} data={data} plotOptions={plotOptions}/>
};
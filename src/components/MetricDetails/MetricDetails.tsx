﻿import React, {FunctionComponent, useState} from "react";
import styles from "./MetricDetails.module.scss";
import {AreaData} from "../../services/dataProcessor";
import {StatRow} from "../Stats/StatRow/StatRow";
import {CustomisableChart} from "../Charts/CustomisableChart/CustomisableChart";
import {Checkbox} from "../Inputs/Checkbox/Checkbox";
import {Select} from "../Inputs/Select/Select";
import {DataPoint} from "../../services/dataStructures";

interface MetricProps {
    name: string;
    data: AreaData | undefined;
}

export const MetricDetails: FunctionComponent<MetricProps> = ({ name, data }) => {
    return (
        <section className={styles.card}>
            <h2 className={styles.header}>{name}</h2>
            { data ? <CardContent data={data}/> : <div>Loading</div> }
        </section>
    );  
};

interface CardContentProps {
    data: AreaData;
}

const plotOptions = [
    { label: "Daily (by publish date)", value: "newCasesByPublishDate", rollingAverage: "" },
    { label: "Daily (by specimen date)", value: "newCasesBySpecimenDate" },
    { label: "Cumulative (by publish date)", value: "cumulativeCasesByPublishDate" },
    { label: "Cumulative (by specimen date)", value: "cumulativeCasesBySpecimenDate" },
];

const CardContent: FunctionComponent<CardContentProps> = ({data}) => {
    const [logAxis, setLogAxis] = useState(false);
    const [metric, setMetric] = useState<keyof DataPoint>("newCasesByPublishDate");
    
    const updateMetric = (newPlot: string) => {
        setMetric(newPlot as keyof DataPoint);
    };
    
    return (
        <div>
            <StatRow label={"Cases"} statCategory={data.stats.cases} showLabel={false}/>
            <CustomisableChart data={data.timeSeries} 
                               dataKey={metric}
                               scale={logAxis ? "log" : "auto"}
            />
            <div className={styles.controls}>
                <Checkbox label={"Log Axis"} value={logAxis} onChange={setLogAxis}/>
                <Select label={"Metric"} value={metric} options={plotOptions} onChange={updateMetric}/>
            </div>
        </div>
    );
};
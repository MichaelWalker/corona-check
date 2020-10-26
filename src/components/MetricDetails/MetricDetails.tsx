import React, {FunctionComponent, useState} from "react";
import styles from "./MetricDetails.module.scss";
import {Metric, Stat} from "../../services/dataProcessor";
import {StatRow} from "../Stats/StatRow/StatRow";
import {CustomisableChart} from "../Charts/CustomisableChart/CustomisableChart";
import {Select} from "../Inputs/Select/Select";

interface MetricProps {
    name: string;
    metrics: Metric[];
}

interface CardContentProps {
    metrics: Metric[];
    stats: Stat[];
}

export const MetricDetails: FunctionComponent<MetricProps> = ({ name, metrics }) => {
    const stats = metrics.map(m => m.stat).filter(s => s !== undefined) as Stat[];
    return (
        <section className={styles.card}>
            <h2 className={styles.header}>{name}</h2>
            <CardContent metrics={metrics} stats={stats}/>
        </section>
    );  
};

const CardContent: FunctionComponent<CardContentProps> = ({metrics, stats}) => {
    const [metric, setMetric] = useState<Metric>(metrics[0]);
    
    const updateMetric = (metricLabel: string): void => {
        const newMetric = metrics.find(m => m.label === metricLabel);
        setMetric(newMetric!);
    };
    
    return (
        <div>
            <StatRow stats={stats}/>
            <CustomisableChart data={metric.data}/>
            <div className={styles.controls}>
                <Select label={"Metric"} value={metric.label} options={metrics} onChange={updateMetric}/>
            </div>
        </div>
    );
};
import React, {FunctionComponent, useState} from "react";
import styles from "./MetricDetails.module.scss";
import {CustomisableChart} from "../Charts/CustomisableChart/CustomisableChart";
import {Select} from "../Inputs/Select/Select";
import {formatDaysAgo, formatFigure} from "../../services/formatHelpers";
import {Figure, Metric, MetricCategory} from "../../services/processingHelpers";

interface MetricProps {
    name: string;
    metricCategory: MetricCategory;
}

export const MetricDetails: FunctionComponent<MetricProps> = ({ name, metricCategory }) => {
    const [metric, setMetric] = useState<Metric>(metricCategory.metrics[0]);

    const overviewStats = metricCategory.overviewStats;

    const updateMetric = (metricLabel: string): void => {
        const newMetric = metricCategory.metrics.find(m => m.label === metricLabel);
        setMetric(newMetric!);
    };

    return (
        <section className={styles.card}>
            <div className={styles.headerRow}>
                <div>
                    <h2 className={styles.header}>{name}</h2>
                    <div className={styles.lastUpdated}>Last updated: {formatDaysAgo(overviewStats.lastUpdated)}</div>
                </div>
                <div className={styles.figureContainer}>
                    {overviewStats.stats.map(stat => <MetricFigure key={stat.label} label={stat.label} figure={stat.value}/>)}
                </div>
            </div>
            <CustomisableChart data={metric.data}/>
            <div className={styles.controls}>
                <Select label={"Metric"} value={metric.label} options={metricCategory.metrics} onChange={updateMetric}/>
            </div>
        </section>
    );  
};

interface MetricFigureProps {
    label: string;
    figure: Figure;
}

const MetricFigure: FunctionComponent<MetricFigureProps> = ({label, figure}) => {
    return (
        <div className={styles.figure}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{formatFigure(figure)}</div>
        </div>
    );
};

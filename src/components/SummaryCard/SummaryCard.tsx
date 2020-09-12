import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SummaryCard.module.scss";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SimpleAreaChart} from "../Charts/SimpleAreaChart/SimpleAreaChart";
import {StatRow} from "../Stats/StatRow/StatRow";

interface SummaryCardProps {
    areaName: string;
    isLarge?: boolean;
}

export const SummaryCard: FunctionComponent<SummaryCardProps> = ({areaName, isLarge = false}) => {
    const [data, setData] = useState<AreaData | null>(null);
    
    useEffect(() => {
        getAreaData(areaName)
            .then(areaData => setData(areaData))
    }, [areaName]);
    
    if (data === null) {
        return (
            <section className={isLarge ? styles.largeCard : styles.card}>
                Loading...
            </section>
        );
    }
    
    return (
        <section className={isLarge ? styles.largeCard : styles.card}>
            <h2 className={styles.title}>{areaName}</h2>
            <StatRow statCategory={data.stats.cases}/>
            <SimpleAreaChart data={data.timeSeries} dataKey="newCasesByPublishDateRollingAverage"/>
        </section>
    );  
};

export const LargeSummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    return (
        <SummaryCard areaName={areaName} isLarge={true}/>
    );
};
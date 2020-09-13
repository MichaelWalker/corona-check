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
    
    const getContent = () => {
        if (!data) {
            return <div>Loading...</div>
        }
        if (isLarge) {
            return <LargeCardContent areaData={data}/>
        }
        return <CardContent areaData={data}/>
    };
    
    return (
        <section className={isLarge ? styles.largeCard : styles.card}>
            <h2 className={styles.title}>{areaName}</h2>
            {getContent()}
        </section>
    );  
};

export const LargeSummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    return (
        <SummaryCard areaName={areaName} isLarge={true}/>
    );
};

interface CardContentProps {
    areaData: AreaData;
}

const CardContent: FunctionComponent<CardContentProps> = ({areaData}) => {
    return (
        <div>
            <div className={styles.statRow}>
                <StatRow label={"Cases"} statCategory={areaData.stats.cases}/>
            </div>
            <div className={styles.graphContainer}>
                <SimpleAreaChart data={areaData.timeSeries} dataKey="newCasesRollingAverage"/>
            </div>
        </div>
    );  
};

const LargeCardContent: FunctionComponent<CardContentProps> = ({areaData}) => {
    return (
        <ul className={styles.categoryList}>
            <li className={styles.category}>
                <StatRow label={"Cases"} statCategory={areaData.stats.cases}/>
                <SimpleAreaChart data={areaData.timeSeries} dataKey="newCasesRollingAverage"/>
            </li>
            <li className={styles.category}>
                <StatRow label={"Admissions"} statCategory={areaData.stats.admissions}/>
                <SimpleAreaChart data={areaData.timeSeries} dataKey="newAdmissionsRollingAverage"/>
            </li>
            <li className={styles.category}>
                <StatRow label={"Deaths"} statCategory={areaData.stats.deaths}/>
                <SimpleAreaChart data={areaData.timeSeries} dataKey="newDeathsRollingAverage"/>
            </li>
        </ul>
    );
};
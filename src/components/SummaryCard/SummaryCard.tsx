import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SummaryCard.module.scss";
import {NewCasesStat, TotalCasesStat, CasesTrendStat} from "../Stat/Stat";
import {AreaData, getAreaData} from "../../services/dataProcessor";

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
            <section className={styles.card}>
                Loading...
            </section>
        );
    }
    
    return (
        <section className={isLarge ? styles.largeCard : styles.card}>
            <h2 className={styles.title}>{areaName}</h2>
            <div className={styles.statRow}>
                <NewCasesStat value={data.stats.cases.new} lastUpdated={data.stats.cases.date}/>
                <TotalCasesStat value={data.stats.cases.total} lastUpdated={data.stats.cases.date}/>
                <CasesTrendStat value={data.stats.cases.trend} lastUpdated={data.stats.cases.date}/>
            </div>
        </section>
    );  
};

export const LargeSummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    return (
        <SummaryCard areaName={areaName} isLarge={true}/>
    );
};
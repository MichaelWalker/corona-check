import React, {FunctionComponent} from "react";
import styles from "./SummaryCard.module.scss";
import {NewCasesStat, TotalCasesStat, CasesTrendStat} from "../Stat/Stat";
import moment from "moment";

interface SummaryCardProps {
    areaName: string;
}

export const SummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    return (
        <section className={styles.card}>
            <h2 className={styles.title}>{areaName}</h2>
            <div className={styles.statRow}>
                <NewCasesStat value={3000} lastUpdated={moment()}/>
                <TotalCasesStat value={180000} lastUpdated={moment("09-11-2020")}/>
                <CasesTrendStat value={1.2} lastUpdated={moment("09-10-2020")}/>
            </div>
        </section>
    );  
};

export const LargeSummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    return (
        <section className={styles.largeCard}>
            <h2 className={styles.title}>{areaName}</h2>
            <div className={styles.statGrid}>
                <NewCasesStat value={3000} lastUpdated={moment()}/>
                <TotalCasesStat value={180000} lastUpdated={moment()}/>
                <CasesTrendStat value={1.2} lastUpdated={moment()}/>
            </div>
        </section>
    );
};
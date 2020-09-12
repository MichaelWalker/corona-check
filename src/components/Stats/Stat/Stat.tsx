import React, {FunctionComponent} from "react";
import moment from "moment";
import styles from "./Stat.module.scss";
import {Stat} from "../../../services/statService";

interface StatProps {
    stat: Stat | undefined;
}

type BaseStatProps = StatProps & {
    className: string;
    name: string;
}

export const StatComponent: FunctionComponent<BaseStatProps> = ({name, stat, className}) => {
    const hasCurrentData = (): boolean => {
        if (!stat) {
            return false;
        }
        return stat.lastUpdated.isSame(moment(), "day");
    };

    const valueString = (): string => {
        if (!stat) {
            return "N/A";
        }
        if (stat.value > 1000000) {
            return `${(stat.value / 1000000).toPrecision(3)}M`;
        }
        if (stat.value > 1000) {
            return `${(stat.value / 1000).toPrecision(3)}k`;
        }
        return `${stat.value}`;
    };

    const lastUpdatedString = (): string => {
        if (!stat) {
            return "-";
        }
        if (stat.lastUpdated.isSame(moment(), "day")) {
            return "today";
        }
        if (stat.lastUpdated.isSame(moment().add(-1, "day"), "day")) {
            return "yesterday";
        }
        return stat.lastUpdated.fromNow();
    };
    
    return (
        <div className={`${styles.statContainer} ${className} ${hasCurrentData() ? "" : styles.isNotCurrent}`}>
            <div className={styles.name}>{name}</div>
            <div className={styles.value}>{valueString()}</div>
            <div className={styles.lastUpdated}>{lastUpdatedString()}</div>
        </div>
    );
};

export const NewCasesStat: FunctionComponent<StatProps> = ({stat}) => {
    return <StatComponent name={"New Cases"} stat={stat} className={styles.newCases}/>  
};

export const TotalCasesStat: FunctionComponent<StatProps> = ({stat}) => {
    return <StatComponent name={"Total Cases"} stat={stat} className={styles.totalCases}/>
};

export const CasesTrendStat: FunctionComponent<StatProps> = ({stat}) => {
    return <StatComponent name={"Trend in Cases"} stat={stat} className={styles.trend}/>
};


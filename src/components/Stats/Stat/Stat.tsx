import React, {FunctionComponent} from "react";
import moment from "moment";
import styles from "./Stat.module.scss";
import {Stat} from "../../../services/dataProcessor";

type StatProps = {
    stat: Stat;
}

export const StatComponent: FunctionComponent<StatProps> = ({ stat}) => {
    const valueString = (): string => {
        if (stat.value === null) {
            return "N/A";
        }
        if (stat.value > 1000000) {
            return `${(stat.value / 1000000).toPrecision(3)}M`;
        }
        if (stat.value > 1000) {
            return `${(stat.value / 1000).toPrecision(3)}k`;
        }
        if (stat.value < 1 && stat.value > 0) {
            return `${stat.value.toFixed(2)}`
        }
        return `${stat.value.toFixed(0)}`;
    };

    const lastUpdatedString = (): string => {
        if (!stat.moment) {
            return "-";
        }
        if (stat.moment.isSame(moment(), "day")) {
            return "today";
        }
        if (stat.moment.isSame(moment().add(-1, "day"), "day")) {
            return "yesterday";
        }
        return stat.moment.fromNow();
    };
    
    const trendString = (): string => {
        if (!stat.trend) {
            return "-";
        }
        
        return `${stat.trend.toFixed(0)}%`;
    };
    
    return (
        <div className={styles.statContainer}>
            <div className={styles.name}>{stat.label}</div>
            <div className={styles.value}>{valueString()}</div>
            <div className={styles.trend}>{trendString()}</div>
            <div className={styles.lastUpdated}>{lastUpdatedString()}</div>
        </div>
    );
};

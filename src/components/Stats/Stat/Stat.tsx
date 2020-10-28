import React, {FunctionComponent} from "react";
import styles from "./Stat.module.scss";
import {formatDaysAgo, formatFigure} from "../../../services/formatHelpers";
import {Stat} from "../../../services/statService";

type StatProps = {
    stat: Stat;
}

export const StatComponent: FunctionComponent<StatProps> = ({ stat}) => {
    const trendString = (): string => {
        if (!stat.trend) {
            return "-";
        }
        
        return `${stat.trend.toFixed(0)}%`;
    };
    
    return (
        <div className={styles.statContainer}>
            <div className={styles.name}>{stat.label}</div>
            <div className={styles.value}>{formatFigure(stat.value)}</div>
            <div className={styles.trend}>{trendString()}</div>
            <div className={styles.lastUpdated}>{formatDaysAgo(stat.moment)}</div>
        </div>
    );
};

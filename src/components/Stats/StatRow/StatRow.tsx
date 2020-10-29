import React, {FunctionComponent} from "react";
import styles from "./StatRow.module.scss";
import {StatComponent} from "../Stat/Stat";
import {Stat} from "../../../services/statService";

interface StatRowProps {
    stats: Stat[];
}

export const StatRow: FunctionComponent<StatRowProps> = ({stats}) => {
    return (
        <div className={styles.statRow}>
            <div className={styles.statContainer}>
                { stats.map(stat => <StatComponent key={stat.label} stat={stat}/>) }
            </div>
        </div>
    );
};
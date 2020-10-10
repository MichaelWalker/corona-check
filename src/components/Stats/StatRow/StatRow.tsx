import React, {FunctionComponent} from "react";
import styles from "./StatRow.module.scss";
import {Stat} from "../../../services/dataProcessor";
import {StatComponent} from "../Stat/Stat";

interface StatRowProps {
    stats: Stat[];
}

export const StatRow: FunctionComponent<StatRowProps> = ({stats}) => {
    return (
        <div className={styles.statRow}>
            <div className={styles.statContainer}>
                { stats.map(stat => <StatComponent stat={stat}/>) }
            </div>
        </div>
    );
};
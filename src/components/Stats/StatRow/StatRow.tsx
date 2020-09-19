import React, {FunctionComponent} from "react";
import {StatCategory} from "../../../services/statService";
import {TrendStat, NewValueStat, TotalValueStat} from "../Stat/Stat";
import styles from "./StatRow.module.scss";

interface StatRowProps {
    label: string;
    statCategory: StatCategory;
    showLabel?: boolean;
}

export const StatRow: FunctionComponent<StatRowProps> = ({label, statCategory, showLabel = true}) => {
    return (
        <div className={styles.statRow}>
            {showLabel && <div className={styles.label}>{label}</div>}
            <div className={styles.statContainer}>
                <NewValueStat stat={statCategory.new}/>
                <TotalValueStat stat={statCategory.total}/>
                <TrendStat stat={statCategory.trend}/>
            </div>
        </div>
    );
};
import React, {FunctionComponent} from "react";
import {StatCategory} from "../../../services/statService";
import {CasesTrendStat, NewCasesStat, TotalCasesStat} from "../Stat/Stat";
import styles from "./StatRow.module.scss";

interface StatRowProps {
    statCategory: StatCategory;
}

export const StatRow: FunctionComponent<StatRowProps> = ({statCategory}) => {
    return (
        <div className={styles.statRow}>
            <NewCasesStat stat={statCategory.new}/>
            <TotalCasesStat stat={statCategory.total}/>
            <CasesTrendStat stat={statCategory.trend}/>
        </div>
    );
};
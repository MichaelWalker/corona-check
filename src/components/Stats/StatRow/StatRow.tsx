import React, {FunctionComponent} from "react";
import {StatCategory} from "../../../services/statService";
import {CasesTrendStat, NewCasesStat, TotalCasesStat} from "../Stat/Stat";
import styles from "./StatRow.module.scss";

interface StatRowProps {
    statCategory: StatCategory | null;
}

export const StatRow: FunctionComponent<StatRowProps> = ({statCategory}) => {
    return (
        <div className={styles.statRow}>
            <NewCasesStat value={statCategory?.new} lastUpdated={statCategory?.date}/>
            <TotalCasesStat value={statCategory?.total} lastUpdated={statCategory?.date}/>
            <CasesTrendStat value={statCategory?.trend} lastUpdated={statCategory?.date}/>
        </div>
    );
};
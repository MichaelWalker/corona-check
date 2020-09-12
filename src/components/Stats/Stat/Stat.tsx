import React, {FunctionComponent} from "react";
import moment from "moment";
import styles from "./Stat.module.scss";

interface StatProps {
    value: number | undefined;
    lastUpdated: moment.Moment | undefined;
}

type BaseStatProps = StatProps & {
    className: string;
    name: string;
}

export const Stat: FunctionComponent<BaseStatProps> = ({name, value, lastUpdated, className}) => {
    const hasCurrentData = (): boolean => {
        if (value === undefined || lastUpdated === undefined) {
            return false;
        }
        return lastUpdated.isSame(moment(), "day");
    };

    const valueString = (): string => {
        if (value === undefined) {
            return "N/A";
        }
        if (value > 1000000) {
            return `${(value / 1000000).toPrecision(3)}M`;
        }
        if (value > 1000) {
            return `${(value / 1000).toPrecision(3)}k`;
        }
        return `${value}`;
    };

    const lastUpdatedString = (): string => {
        if (lastUpdated === undefined) {
            return "-";
        }
        if (lastUpdated.isSame(moment(), "day")) {
            return "today";
        }
        if (lastUpdated.isSame(moment().add(-1, "day"), "day")) {
            return "yesterday";
        }
        return lastUpdated.fromNow();
    };
    
    return (
        <div className={`${styles.statContainer} ${className} ${hasCurrentData() ? "" : styles.isNotCurrent}`}>
            <div className={styles.name}>{name}</div>
            <div className={styles.value}>{valueString()}</div>
            <div className={styles.lastUpdated}>{lastUpdatedString()}</div>
        </div>
    );
};

export const NewCasesStat: FunctionComponent<StatProps> = ({value, lastUpdated}) => {
    return <Stat name={"New Cases"} value={value} lastUpdated={lastUpdated} className={styles.newCases}/>  
};

export const TotalCasesStat: FunctionComponent<StatProps> = ({value, lastUpdated}) => {
    return <Stat name={"Total Cases"} value={value} lastUpdated={lastUpdated} className={styles.totalCases}/>
};

export const CasesTrendStat: FunctionComponent<StatProps> = ({value, lastUpdated}) => {
    return <Stat name={"Trend in Cases"} value={value} lastUpdated={lastUpdated} className={styles.trend}/>
};


import React, {FunctionComponent} from "react";
import moment from "moment";
import styles from "./Stat.module.scss";

interface StatProps {
    value: number;
    lastUpdated: moment.Moment;
}

type BaseStatProps = StatProps & {
    className: string;
    name: string;
}

const lastUpdatedString = (lastUpdated: moment.Moment): string => {
    if (lastUpdated.isSame(moment(), "day")) {
        return "today";
    }
    if (lastUpdated.isSame(moment().add(-1, "day"), "day")) {
        return "yesterday";
    }
    return lastUpdated.fromNow();
};

const valueString = (value: number): string => {
    if (value > 1000000) {
        return `${(value / 1000000).toPrecision(3)}M`;
    }
    if (value > 1000) {
        return `${(value / 1000).toPrecision(3)}k`;
    }
    return `${value}`;
};

export const Stat: FunctionComponent<BaseStatProps> = ({name, value, lastUpdated, className}) => {
    const isOutOfDate = !lastUpdated.isSame(moment(), "day");
    return (
        <div className={`${styles.statContainer} ${className} ${isOutOfDate ? styles.outOfDate : ""}`}>
            <div className={styles.name}>{name}</div>
            <div className={styles.value}>{valueString(value)}</div>
            <div className={styles.lastUpdated}>{lastUpdatedString(lastUpdated)}</div>
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


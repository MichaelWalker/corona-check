import React, {FunctionComponent} from "react";
import styles from "./MetricDetails.module.scss";
import {AreaData} from "../../services/dataProcessor";
import {StatRow} from "../Stats/StatRow/StatRow";
import {CustomisableChart} from "../Charts/CustomisableChart/CustomisableChart";

interface MetricProps {
    name: string;
    data: AreaData | undefined;
}

export const MetricDetails: FunctionComponent<MetricProps> = ({ name, data }) => {
    return (
        <section className={styles.card}>
            <h2 className={styles.header}>{name}</h2>
            { data ? <CardContent data={data}/> : <div>Loading</div> }
        </section>
    );  
};

interface CardContentProps {
    data: AreaData;
}

const CardContent: FunctionComponent<CardContentProps> = ({data}) => {
    return (
        <div>
            <StatRow label={"Cases"} statCategory={data.stats.cases} showLabel={false}/>
            <CustomisableChart data={data.timeSeries} 
                               dataKey={"newCasesByPublishDate"}
                               scale={"auto"}
            />
        </div>
    );
};
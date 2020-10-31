import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SummaryCard.module.scss";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SimpleAreaChart} from "../Charts/SimpleAreaChart/SimpleAreaChart";
import {StatComponent} from "../Stats/Stat/Stat";
import {AreaType} from "../../services/govUkApiClient";
import {Link} from "react-router-dom";

interface SummaryCardProps {
    data: AreaData | undefined;
    areaName?: string | undefined;
}

interface SummaryLinkCardProps { 
    areaName: string;
    areaType: AreaType;
}

export const SummaryLinkCard: FunctionComponent<SummaryLinkCardProps> = ({areaName, areaType}) => {
    const [data, setData] = useState<AreaData | undefined>();
    
    useEffect(() => {
        getAreaData(areaName, areaType).then(setData);
    }, [areaName, areaType]);
    
    return (
        <Link to={`/${areaType}/${areaName}`}>
            <SummaryCard data={data} areaName={areaName}/>
        </Link>
    );
};

export const SummaryCard: FunctionComponent<SummaryCardProps> = ({data, areaName}) => {
    if (!data) {
        return (
            <section className={styles.card}>
                <div>Loading...</div>
            </section>
        );
    }

    const stats = [
        data.cases.headlineStat!,
        data.admissions.headlineStat!,
        data.deaths.headlineStat!,
        data.hospitalisation.headlineStat!
    ];
    
    return (
        <section className={styles.card}>
            <div className={styles.headerRow}>
                <h2 className={styles.title}>{areaName}</h2>
                <div className={styles.statContainer}>
                    { stats.map(stat => <StatComponent key={stat.label} stat={stat}/>) }
                </div>
            </div>
            <div className={styles.graphContainer}>
                <SimpleAreaChart data={data.cases.metrics[0].data!}/>
            </div>
        </section>
    );  
};

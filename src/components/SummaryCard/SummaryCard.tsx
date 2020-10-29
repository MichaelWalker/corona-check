import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SummaryCard.module.scss";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SimpleAreaChart} from "../Charts/SimpleAreaChart/SimpleAreaChart";
import {Link} from "react-router-dom";
import {StatComponent} from "../Stats/Stat/Stat";

interface SummaryCardProps {
    areaName: string;
}

export const SummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    const [data, setData] = useState<AreaData | undefined>();
    
    useEffect(() => {
        getAreaData(areaName)
            .then(areaData => setData(areaData))
    }, [areaName]);
    
    if (!data) {
        return (
            <Link to={`/areas/${areaName}`} className={styles.card}>
                <section>
                    <h2 className={styles.title}>{areaName}</h2>
                    <div>Loading...</div>
                </section>
            </Link>
        );
    }

    const stats = [
        data.cases.headlineStat!,
        data.admissions.headlineStat!,
        data.deaths.headlineStat!,
        data.hospitalisation.headlineStat!
    ];
    
    return (
        <Link to={`/areas/${areaName}`} className={styles.card}>
            <section>
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
        </Link>
    );  
};

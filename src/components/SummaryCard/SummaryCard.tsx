import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SummaryCard.module.scss";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SimpleAreaChart} from "../Charts/SimpleAreaChart/SimpleAreaChart";
import {StatRow} from "../Stats/StatRow/StatRow";
import {Link} from "react-router-dom";

interface SummaryCardProps {
    areaName: string;
    isLarge?: boolean;
}

export const SummaryCard: FunctionComponent<SummaryCardProps> = ({areaName, isLarge = false}) => {
    const [data, setData] = useState<AreaData | undefined>();
    
    useEffect(() => {
        getAreaData(areaName)
            .then(areaData => setData(areaData))
    }, [areaName]);
    
    const getContent = () => {
        if (!data) {
            return <div>Loading...</div>
        }
        return <CardContent areaData={data} isLarge={isLarge}/>
    };
    
    return (
        <Link to={`/areas/${areaName}`} className={isLarge ? `${styles.largeCard} ${styles.card}` : styles.card}>
            <section>
                <h2 className={styles.title}>{areaName}</h2>
                {getContent()}
            </section>
        </Link>
    );  
};

export const LargeSummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    return (
        <SummaryCard areaName={areaName} isLarge={true}/>
    );
};

interface CardContentProps {
    areaData: AreaData;
    isLarge: boolean;
}

const CardContent: FunctionComponent<CardContentProps> = ({areaData, isLarge}) => {
    const stats = [
        areaData.cases[0].stat!,
        areaData.admissions[0].stat!,
        areaData.deaths[0].stat!
    ]
    
    return (
        <div>
            <div className={styles.statRow}>
                <StatRow stats={stats}/>
            </div>
            <div className={styles.graphContainer}>
                <SimpleAreaChart data={areaData.cases[0].data!} isLarge={isLarge}/>
            </div>
        </div>
    );  
};
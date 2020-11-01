import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SummaryCard.module.scss";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SimpleAreaChart} from "../Charts/SimpleAreaChart/SimpleAreaChart";
import {StatComponent} from "../Stats/Stat/Stat";
import {AreaType} from "../../services/govUkApiClient";
import {Link} from "react-router-dom";
import {LoadingCard} from "../LoadingCard/LoadingCard";
import {Card} from "../Card/Card";
import {Stat} from "../Stat/Stat";

interface SummaryCardProps {
    areaName: string;
    areaType: AreaType;
}

export const SummaryCard: FunctionComponent<SummaryCardProps> = ({areaName, areaType}) => {
    const [data, setData] = useState<AreaData | undefined>();
    
    useEffect(() => {
        getAreaData(areaName, areaType).then(setData);
    }, [areaName, areaType]);
    
    if (!data) {
        return <LoadingCard/>;
    }
    
    return (
        <Card>
            <Link to={`/${areaType}/${areaName}`}>
                <div className={styles.headerRow}>
                    <h3 className={styles.title}>{areaName}</h3>
                    <Stat className={styles.stat} label={"New Cases"} figure={data.cases.overviewStats.stats[0].value}/>
                </div>
                <div className={styles.graphContainer}>
                    <SimpleAreaChart data={data.cases.metrics[0].data!} color={"#1573aa"}/>
                </div>
            </Link>
        </Card>
    );
};

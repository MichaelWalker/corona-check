import React, {FunctionComponent, useState} from "react";
import styles from "./OverviewCard.module.scss";
import {AreaData} from "../../services/dataProcessor";
import {LoadingCard} from "../LoadingCard/LoadingCard";
import {Card} from "../Card/Card";
import {SimpleAreaChart} from "../Charts/SimpleAreaChart/SimpleAreaChart";
import {OverviewStats} from "../../services/statService";
import {formatDaysAgo, formatFigure} from "../../services/formatHelpers";
import {MetricDataPoint} from "../../services/processingHelpers";
import {Stat} from "../Stat/Stat";


type StatType = "Cases" | "Admissions" | "Deaths" | "Hospitalisation";

interface OverviewCardProps {
    data: AreaData | undefined;
}

interface StatListProps {
    type: StatType;
    stats: OverviewStats;
    isActive: boolean;
    setSelectedStat: (type: StatType) => void;
}

export const OverviewCard: FunctionComponent<OverviewCardProps> = ({data}) => {
    const [selectedStat, setSelectedStat] = useState<StatType>("Cases");
    
    if (!data) {
        return <LoadingCard/>
    }
    
    const graphData = (): MetricDataPoint[] => {
        switch (selectedStat) {
            case "Cases": return data.cases.metrics[0].data!;
            case "Admissions": return data.admissions.metrics[0].data!;
            case "Hospitalisation": return data.hospitalisation.metrics[0].data!;
            case "Deaths": return data.deaths.metrics[0].data!;
        }  
    };

    const graphColor = (): string => {
        switch (selectedStat) {
            case "Cases": return "#1573aa";
            case "Admissions": return "#aa8a11";
            case "Hospitalisation": return "#6408aa";
            case "Deaths": return "#aa380d";
        }
    };
    
    return (
        <Card>
            <div className={styles.overviewContainer}>
                <div className={styles.statContainer}>
                    <h3 className={styles.cardTitle}>Latest Figures</h3>
                    <StatList type={"Cases"} stats={data.cases.overviewStats} isActive={selectedStat === "Cases"} setSelectedStat={setSelectedStat}/>
                    <StatList type={"Admissions"} stats={data.admissions.overviewStats} isActive={selectedStat === "Admissions"} setSelectedStat={setSelectedStat}/>
                    <StatList type={"Hospitalisation"} stats={data.hospitalisation.overviewStats} isActive={selectedStat === "Hospitalisation"} setSelectedStat={setSelectedStat}/>
                    <StatList type={"Deaths"} stats={data.deaths.overviewStats} isActive={selectedStat === "Deaths"} setSelectedStat={setSelectedStat}/>
                </div>
                <div className={styles.graphContainer}>
                    <SimpleAreaChart data={graphData()} color={graphColor()}/>
                </div>
            </div>
        </Card>
    );
};

const StatList: FunctionComponent<StatListProps> = ({type, stats, isActive, setSelectedStat}) => {
    const containerClassName = () => {
        let className = styles.statCategory;
        
        if (isActive) {
            className += ` ${styles.active}`;
        }

        switch (type) {
            case "Cases": className += ` ${styles.cases}`; break;
            case "Admissions": className += ` ${styles.admissions}`; break;
            case "Hospitalisation": className += ` ${styles.hospitalisation}`; break;
            case "Deaths": className += ` ${styles.deaths}`; break;
        }
        
        return className;
    };
    
    return (
        <button className={containerClassName()} onClick={() => setSelectedStat(type)}>
            <div className={styles.statCategoryHeader}>
                <h4 className={styles.statCategoryName}>{type}</h4>
                <span className={styles.statUpdatedText}>Last Updated: {formatDaysAgo(stats.lastUpdated)}</span>
            </div>
            {stats.stats.map(stat => <Stat key={stat.label} label={stat.label} figure={stat.value}/>)}
        </button>
    );
};

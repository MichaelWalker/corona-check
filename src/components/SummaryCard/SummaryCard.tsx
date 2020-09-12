import React, {FunctionComponent} from "react";
import styles from "./SummaryCard.module.scss";

interface SummaryCardProps {
    className?: string | undefined;
    areaName: string;
}

export const SummaryCard: FunctionComponent<SummaryCardProps> = ({className, areaName}) => {
    return (
        <section className={`${styles.card} ${className || ""}`}>
            <h2 className={styles.title}>{areaName}</h2>
        </section>
    );  
};

export const LargeSummaryCard: FunctionComponent<SummaryCardProps> = ({areaName}) => {
    return <SummaryCard areaName={areaName} className={styles.largeCard}/>
}
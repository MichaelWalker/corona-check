import React, {FunctionComponent} from "react";
import styles from "./SummaryPage.module.scss";
import {LargeSummaryCard, SummaryCard} from "../SummaryCard/SummaryCard";

interface SummaryPageProps {
    title: string;
}

export const SummaryPage: FunctionComponent<SummaryPageProps> = ({title}) => {
    return (
        <main className={styles.page}>
            <div className={styles.cardContainer}>
                <LargeSummaryCard areaName={"United Kingdom"}/>
                <SummaryCard areaName={"England"}/>
                <SummaryCard areaName={"Scotland"}/>
                <SummaryCard areaName={"Wales"}/>
                <SummaryCard areaName={"Northern Ireland"}/>
            </div>
        </main>
    );  
};
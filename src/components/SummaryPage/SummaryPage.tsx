import React, {FunctionComponent} from "react";
import styles from "./SummaryPage.module.scss";
import {SummaryCard} from "../SummaryCard/SummaryCard";

export const UkSummaryPage: FunctionComponent = () => {
    return (
        <main className={styles.page}>
            <div className={styles.cardContainer}>
                <SummaryCard areaName={"United Kingdom"}/>
                <SummaryCard areaName={"England"}/>
                <SummaryCard areaName={"Scotland"}/>
                <SummaryCard areaName={"Wales"}/>
                <SummaryCard areaName={"Northern Ireland"}/>
            </div>
        </main>
    );  
};

export const DevonSummaryPage: FunctionComponent = () => {
    return (
        <main className={styles.page}>
            <div className={styles.cardContainer}>
                <SummaryCard areaName={"Devon"}/>
                <SummaryCard areaName={"East Devon"}/>
                <SummaryCard areaName={"Exeter"}/>
                <SummaryCard areaName={"Mid Devon"}/>
                <SummaryCard areaName={"South Hams"}/>
                <SummaryCard areaName={"Teignbridge"}/>
                <SummaryCard areaName={"Torridge"}/>
                <SummaryCard areaName={"Torbay"}/>
                <SummaryCard areaName={"West Devon"}/>
                <SummaryCard areaName={"Plymouth"}/>
                <SummaryCard areaName={"North Devon"}/>
            </div>
        </main>
    );
};

export const FavouritesSummaryPage: FunctionComponent = () => {
    return (
        <main className={styles.page}>
            <div className={styles.cardContainer}>
                <SummaryCard areaName={"Islington"}/>
                <SummaryCard areaName={"Kensington and Chelsea"}/>
                <SummaryCard areaName={"Richmond upon Thames"}/>
                <SummaryCard areaName={"Peterborough"}/>
                <SummaryCard areaName={"Wirral"}/>
                <SummaryCard areaName={"Cornwall and Isles of Scilly"}/>
            </div>
        </main>
    );
};
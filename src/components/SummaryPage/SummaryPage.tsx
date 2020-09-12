import React, {FunctionComponent} from "react";
import styles from "./SummaryPage.module.scss";

interface SummaryPageProps {
    title: string;
}

export const SummaryPage: FunctionComponent<SummaryPageProps> = ({title}) => {
    return (
        <main className={styles.page}>
            <h1>{title}</h1>
            <p>Coming Soon!</p>
        </main>
    );  
};
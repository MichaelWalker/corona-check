import React, {FunctionComponent} from "react";
import { useParams } from "react-router-dom";
import styles from "./AreaPage.module.scss";

export const AreaPage: FunctionComponent = () => {
    const { name } = useParams();
    
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>{name}</h1>
        </div>
    );
};
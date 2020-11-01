import React, {FunctionComponent} from "react";
import styles from "./Stat.module.scss";
import {formatFigure} from "../../services/formatHelpers";
import {Figure} from "../../services/processingHelpers";

interface StatProps {
    label: string;
    figure: Figure;
    className?: string | undefined; 
} 

export const Stat: FunctionComponent<StatProps> = ({label, figure, className}) => {
    return (
        <div className={className || styles.stat}>
            <div className={styles.label}>{label}</div>
            <div className={styles.figure}>{formatFigure(figure)}</div>
        </div>
    );
};

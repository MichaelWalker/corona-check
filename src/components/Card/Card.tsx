import React, {FunctionComponent} from "react";
import styles from "./Card.module.scss";

interface CardProps {
    title?: string | undefined;
}

export const Card: FunctionComponent<CardProps> = ({title, children}) => {
    return (
        <div className={styles.card}>
            {title && <h3>{title}</h3>}
            {children}
        </div>
    );
};

import React, {FunctionComponent} from "react";
import styles from "./Card.module.scss";

interface CardProps {
    title?: string | undefined;
    className?: string | undefined;
}

export const Card: FunctionComponent<CardProps> = ({title, className, children}) => {
    return (
        <div className={`${styles.card} ${className}`}>
            {title && <h3 className={styles.cardTitle}>{title}</h3>}
            {children}
        </div>
    );
};

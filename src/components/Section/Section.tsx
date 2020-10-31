import React, {FunctionComponent} from "react";
import styles from "./Section.module.scss";

interface SectionProps {
    title: string;
}

export const Section: FunctionComponent<SectionProps> = ({title, children}) => {
    return (
        <section className={styles.section}>
            <h2 className={styles.sectionTitle}>{title}</h2>
            {children}
        </section>
    );
};

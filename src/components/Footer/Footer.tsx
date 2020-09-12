import React, {FunctionComponent} from "react";
import styles from "./Footer.module.scss";

export const Footer: FunctionComponent = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.iconCredit}>
                Icons made by 
                <a className={styles.link} href="https://www.flaticon.com/authors/srip" title="srip"> srip </a>
                from <a className={styles.link} href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
    );
};
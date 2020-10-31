import React, {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";
import styles from "./SubNav.module.scss";

export const SubNav: FunctionComponent = () => {
    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <NavLink className={styles.navItem} activeClassName={styles.active} to={"/overview/united kingdom"}>UK</NavLink>
                <NavLink className={styles.navItem} activeClassName={styles.active} to={"/utla/devon"}>Devon</NavLink>
            </nav>
        </div>
    );  
};
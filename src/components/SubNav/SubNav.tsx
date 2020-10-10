import React, {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";
import styles from "./SubNav.module.scss";

export const SubNav: FunctionComponent = () => {
    return (
        <div className={styles.navContainer}>
            <nav className={styles.nav}>
                <NavLink className={styles.navItem} activeClassName={styles.active} to={"/uk"} >UK</NavLink>
                <NavLink className={styles.navItem} activeClassName={styles.active} to={"/devon"} >Devon</NavLink>
                <NavLink className={styles.navItem} activeClassName={styles.active} to={"/favourites"} >Favourites</NavLink>
            </nav>
        </div>
    );  
};
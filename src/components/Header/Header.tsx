import React, {FormEvent, useState} from "react";
import {NavLink, useHistory} from "react-router-dom";
import styles from "./Header.module.scss";
import {Logo} from "./Logo/Logo";
import {SearchIcon} from "./SearchIcon/SearchIcon";

export const Header = () => {
    const history = useHistory();
    const [search, setSearch] = useState("");
    
    const searchAreas = (event: FormEvent) => {
        event.preventDefault();
        history.push(`/areas/${search}`)
    };
    
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink className={styles.logoLink} to={"/"}><Logo/>CoronaCheck</NavLink>
                <NavLink className={styles.navItem} to={"/areas"}>Areas</NavLink>
                <form className={styles.form} onSubmit={searchAreas}>
                    <label className={styles.searchLabel}>Search
                        <input className={styles.input} type="text" value={search} onChange={event => setSearch(event.target.value)}/>
                    </label>
                    <button className={styles.searchButton}><SearchIcon/></button>
                </form>
            </nav>
        </header>
    );  
};
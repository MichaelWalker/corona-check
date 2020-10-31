import React from 'react';
import styles from './App.module.scss';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {Header} from "../Header/Header";
import {SubNav} from "../SubNav/SubNav";
import {Footer} from "../Footer/Footer";
import moment from "moment";
import {RegionPage} from "../RegionPage/RegionPage";

moment.relativeTimeRounding(Math.floor);

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <div className={styles.main}>
                <SubNav/>
                <Switch>
                    <Route path={"/:areaType/:areaName"} exact={true} children={<RegionPage/>}/>
                    <Route path={"/"} exact={true} children={<Redirect to={"/overview/united kingdom"}/>}/>
                </Switch>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

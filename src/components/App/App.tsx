import React from 'react';
import styles from './App.module.scss';
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {Header} from "../Header/Header";
import {SubNav} from "../SubNav/SubNav";
import {Footer} from "../Footer/Footer";
import {DevonSummaryPage, FavouritesSummaryPage, UkSummaryPage} from "../SummaryPage/SummaryPage";
import moment from "moment";
import {AreaPage} from "../AreaPage/AreaPage";

moment.relativeTimeRounding(Math.floor);

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <div className={styles.main}>
                <Switch>
                    <Route path={"/areas"} exact={true}>
                        <h1>Areas</h1>
                        <p>Coming Soon!</p>
                    </Route>
                    <Route path={"/areas/:name"} exact={true}>
                        <AreaPage/>
                    </Route>

                    <Route path={""}>
                        <SubNav/>
                        <Route path={"/"} exact={true}>
                            <Redirect to={"/uk"}/>
                        </Route>
                        <Route path={"/uk"} exact={true}>
                            <UkSummaryPage/>
                        </Route>
                        <Route path={"/devon"} exact={true}>
                            <DevonSummaryPage/>
                        </Route>
                        <Route path={"/favourites"} exact={true}>
                            <FavouritesSummaryPage/>
                        </Route>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

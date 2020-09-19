import React from 'react';
import styles from './App.module.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Header} from "../Header/Header";
import {ByAreaPage} from "../ByAreaPage/ByAreaPage";
import {AREAS_OF_INTEREST, LOCAL_AREAS, NATIONS} from "../../config/areas";
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
                    <Route path={"/national"} exact={true}>
                        <ByAreaPage title={"National"} areaNames={NATIONS}/>
                    </Route>
                    <Route path={"/local"} exact={true}>
                        <ByAreaPage title={"Local"} areaNames={LOCAL_AREAS}/>
                    </Route>
                    <Route path={"/regions-of-interest"} exact={true}>
                        <ByAreaPage title={"Areas of Interest"} areaNames={AREAS_OF_INTEREST}/>
                    </Route>

                    <Route path={"/areas"} exact={true}>
                        <h1>Areas</h1>
                        <p>Coming Soon!</p>
                    </Route>
                    <Route path={"/areas/:name"} exact={true}>
                        <AreaPage/>
                    </Route>

                    <Route path={""}>
                        <SubNav/>
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

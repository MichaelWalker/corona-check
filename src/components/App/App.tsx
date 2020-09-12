import React from 'react';
import styles from './App.module.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Header} from "../Header/Header";
import {ByAreaPage} from "../ByAreaPage/ByAreaPage";
import {AREAS_OF_INTEREST, LOCAL_AREAS, NATIONS} from "../../config/areas";
import {SubNav} from "../SubNav/SubNav";
import {Footer} from "../Footer/Footer";
import {SummaryPage} from "../SummaryPage/SummaryPage";

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
                        <p>Coming Soon!</p>
                    </Route>

                    <Route path={""}>
                        <SubNav/>
                        <Route path={"/uk"} exact={true}>
                            <SummaryPage title={"UK"}/>
                        </Route>
                        <Route path={"/devon"} exact={true}>
                            <SummaryPage title={"Devon"}/>
                        </Route>
                        <Route path={"/favourites"} exact={true}>
                            <SummaryPage title={"Favourites"}/>
                        </Route>
                    </Route>
                </Switch>
            </div>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;

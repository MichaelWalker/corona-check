import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Header} from "../Header/Header";
import {ByAreaPage} from "../ByAreaPage/ByAreaPage";
import {Settings} from "../Settings/SettingsContext";
import {AREAS_OF_INTEREST, LOCAL_AREAS, NATIONS} from "../../config/areas";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <main>
                <Settings>
                    <Switch>
                        <Route path={"/"} exact={true}>
                            <ByAreaPage title={"National"} areaNames={NATIONS}/>
                        </Route>
                        <Route path={"/local"} exact={true}>
                            <ByAreaPage title={"Local"} areaNames={LOCAL_AREAS}/>
                        </Route>
                        <Route path={"/regions-of-interest"} exact={true}>
                            <ByAreaPage title={"Areas of Interest"} areaNames={AREAS_OF_INTEREST}/>
                        </Route>
                        <Route path={"/find-a-region"} exact={true}>
                            <h1>Find a Region</h1>
                        </Route>
                    </Switch>
                </Settings>
            </main>
        </BrowserRouter>
    );
}

export default App;

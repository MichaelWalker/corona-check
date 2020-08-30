import React from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Header} from "../Header/Header";
import {GraphPage} from "../GraphPage/GraphPage";
import {Settings} from "../Settings/SettingsContext";

const nations = [
    'United Kingdom',
    'England',
    'Scotland',
    'Wales',
    'Northern Ireland'
];

const areasOfInterest = [
    'Islington',
    'Kensington and Chelsea',
    'Richmond upon Thames',
    'Peterborough',
    'Wirral',
];

const localAreas = [
    'Devon',
    'East Devon',
    'Exeter',
    'Mid Devon',
    'South Hams',
    'Teignbridge',
    'Torridge',
    'Torbay',
    'West Devon',
    'Plymouth',
    'North Devon',
    'Cornwall and Isles of Scilly'
];

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <main>
                <Settings>
                    <Switch>
                        <Route path={"/"} exact={true}>
                            <GraphPage title={"National"} areaNames={nations}/>
                        </Route>
                        <Route path={"/local"} exact={true}>
                            <GraphPage title={"Local"} areaNames={localAreas}/>
                        </Route>
                        <Route path={"/regions-of-interest"} exact={true}>
                            <GraphPage title={"Areas of Interest"} areaNames={areasOfInterest}/>
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

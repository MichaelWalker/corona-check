import React, {useState} from 'react';
import './App.scss';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import {Header} from "./Header/Header";
import {GraphPage} from "./GraphPage/GraphPage";

export type Mode = "raw" | "graph";

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
    const [mode, setMode] = useState<Mode>("graph");
    return (
        <BrowserRouter>
            <Header/>
            <main>
                <Switch>
                    <Route path={"/"} exact={true}>
                        <GraphPage title={"National"} areaNames={nations} mode={mode}/>
                    </Route>
                    <Route path={"/local"} exact={true}>
                        <GraphPage title={"Local"} areaNames={localAreas} mode={mode}/>
                    </Route>
                    <Route path={"/regions-of-interest"} exact={true}>
                        <GraphPage title={"Areas of Interest"} areaNames={areasOfInterest} mode={mode}/>
                    </Route>
                    <Route path={"/find-a-region"} exact={true}>
                        <h1>Find a Region</h1>
                    </Route>
                </Switch>
            </main>
        </BrowserRouter>
    );
}

export default App;

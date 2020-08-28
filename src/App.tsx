import React, {useState} from 'react';
import './App.scss';
import {Area} from "./Area/Area";

export type Mode = "raw" | "graph";

const areas = [
    'Devon',
    'Islington',
    'Kensington and Chelsea',
    'Richmond upon Thames',
    'Peterborough',
    'Wirral',

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
        <main>
            <ul>
                {areas.map(area => <li><Area areaName={area} mode={mode}/></li>)}
            </ul>
        </main>
    );
}

export default App;

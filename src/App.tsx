import React from 'react';
import './App.scss';
import {Area} from "./Area/Area";

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
  return (
    <main>
      <ul>
        {areas.map(area => <li><Area areaName={area}/></li>)}
      </ul>
    </main>
  );
}

export default App;

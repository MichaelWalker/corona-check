import React, {FunctionComponent} from "react";
import {Area} from "../Area/Area";
import {Mode} from "../App";

interface GraphPageProps {
    title: string;
    areaNames: string[];
    mode: Mode;
}

export const GraphPage: FunctionComponent<GraphPageProps> = ({ title, areaNames, mode }) => {
    return (
        <div>
            <h1>{title}</h1>
            {areaNames.map(areaName => <Area areaName={areaName} mode={mode}/>)}
        </div>
    );  
};
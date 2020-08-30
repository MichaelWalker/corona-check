import React, {FunctionComponent} from "react";
import {Area} from "../Area/Area";

interface GraphPageProps {
    title: string;
    areaNames: string[];
}

export const GraphPage: FunctionComponent<GraphPageProps> = ({ title, areaNames }) => {
    return (
        <div>
            <h1>{title}</h1>
            {areaNames.map(areaName => <Area areaName={areaName}/>)}
        </div>
    );  
};
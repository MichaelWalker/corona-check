import React, {FunctionComponent} from "react";
import {Area} from "../AreaCard/AreaCard";

interface ByAreaPageProps {
    title: string;
    areaNames: string[];
}

export const ByAreaPage: FunctionComponent<ByAreaPageProps> = ({ title, areaNames }) => {
    return (
        <div>
            <h1>{title}</h1>
            {areaNames.map(areaName => <Area areaName={areaName}/>)}
        </div>
    );  
};
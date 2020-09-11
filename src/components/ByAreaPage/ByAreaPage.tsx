import React, {FunctionComponent} from "react";
import {Area} from "../AreaCard/AreaCard";
import {Settings} from "../Settings/SettingsContext";

interface ByAreaPageProps {
    title: string;
    areaNames: string[];
}

export const ByAreaPage: FunctionComponent<ByAreaPageProps> = ({ title, areaNames }) => {
    return (
        <Settings>
            <h1>{title}</h1>
            {areaNames.map(areaName => <Area areaName={areaName}/>)}
        </Settings>
    );  
};
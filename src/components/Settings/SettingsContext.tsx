import React, {FunctionComponent, useState} from "react";
import moment from "moment";
import {ViewerSettings} from "./ViewerSettings";

export type ViewerMode = "Graph" | "Raw";
export type Metric = 
    "Total Cases" | 
    "Total Cases Rate" | 
    "New Cases" | 
    "New Cases Rate" | 
    "Total Admissions" | 
    "Total Admissions Rate" | 
    "New Admissions" | 
    "New Admissions Rate" | 
    "Total Deaths" |
    "Total Deaths Rate" |
    "New Deaths" |
    "New Deaths Rate" |
    "Hospital Cases" |
    "Hospital Capacity" |
    "Hospital Utilisation";

const initialContext = {
    viewer: "Graph" as ViewerMode,
    metric: "Total Cases" as Metric,
    startDate: moment(),
    endDate: moment(),
};
export const SettingsContext = React.createContext(initialContext);

export const Settings: FunctionComponent = ({children}) => {
    const [viewer, setViewer] = useState<ViewerMode>("Graph");
    const [metric, setMetric] = useState<Metric>("Total Cases");
    const [startDate, setStartDate] = useState(moment());
    const [endDate, setEndDate] = useState(moment());
    
    const context = {
        viewer, metric, startDate, endDate
    };
    
    return (
        <SettingsContext.Provider value={context}>
            <section>
                <ViewerSettings viewer={viewer} setViewer={setViewer}/>
            </section>
            {children}
        </SettingsContext.Provider>
    );
};

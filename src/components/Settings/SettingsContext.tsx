import React, {FunctionComponent, useState} from "react";
import moment from "moment";
import {ViewerSettings} from "./ViewerSettings";
import {MetricSettings} from "./MetricSettings";

export type ViewerMode = "Graph" | "Raw";
export type Metric = 
    "Total Cases" | 
    "Total Cases Per Population" | 
    "New Cases" | 
    "New Cases Per Population" | 
    "Total Admissions" | 
    "Total Admissions Per Population" | 
    "New Admissions" | 
    "New Admissions Per Population" | 
    "Total Deaths" |
    "Total Deaths Per Population" |
    "New Deaths" |
    "New Deaths Per Population" |
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
                <MetricSettings metric={metric} setMetric={setMetric}/>
            </section>
            {children}
        </SettingsContext.Provider>
    );
};

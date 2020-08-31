import React, {FunctionComponent, useState} from "react";
import moment from "moment";
import {ViewerSettings} from "./ViewerSettings/ViewerSettings";
import {MetricSettings} from "./MetricSettings/MetricSettings";
import {Metric, ViewerMode} from "../../config/options";
import {DateSettings} from "./DateSettings/DateSettings";


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
    const [startDate, setStartDate] = useState(moment("01 March 2020"));
    const [endDate, setEndDate] = useState(moment());
    
    const context = {
        viewer, metric, startDate, endDate
    };
    
    return (
        <SettingsContext.Provider value={context}>
            <section>
                <ViewerSettings viewer={viewer} setViewer={setViewer}/>
                <MetricSettings metric={metric} setMetric={setMetric}/>
                <DateSettings startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            </section>
            {children}
        </SettingsContext.Provider>
    );
};

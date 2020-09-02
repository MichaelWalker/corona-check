import React, {FunctionComponent, useState} from "react";
import moment from "moment";
import {ViewerSettings} from "./ViewerSettings/ViewerSettings";
import {MetricSettings} from "./MetricSettings/MetricSettings";
import {Metric, METRICS, RecordType, ViewerMode} from "../../config/options";
import {DateSettings} from "./DateSettings/DateSettings";
import {RecordTypeSettings} from "./RecordTypeSettings/RecordTypeSettings";


const initialContext = {
    viewer: "Graph" as ViewerMode,
    metric: METRICS[0],
    recordType: "Publish Date" as RecordType,
    startDate: moment(),
    endDate: moment(),
};
export const SettingsContext = React.createContext(initialContext);

export const Settings: FunctionComponent = ({children}) => {
    const [viewer, setViewer] = useState<ViewerMode>("Graph");
    const [metric, setMetric] = useState<Metric>(METRICS[0]);
    const [recordType, setRecordType] = useState<RecordType>("By Publish Date");
    const [startDate, setStartDate] = useState(moment("01 March 2020"));
    const [endDate, setEndDate] = useState(moment());
    
    const context = {
        viewer, metric, recordType, startDate, endDate
    };
    
    return (
        <SettingsContext.Provider value={context}>
            <section>
                <ViewerSettings viewer={viewer} setViewer={setViewer}/>
                <MetricSettings metric={metric} setMetric={setMetric}/>
                <RecordTypeSettings recordType={recordType} setRecordType={setRecordType}/>
                <DateSettings startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            </section>
            {children}
        </SettingsContext.Provider>
    );
};

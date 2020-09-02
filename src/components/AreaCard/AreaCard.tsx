import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {TableViewer} from "../Viewers/TableViewer/TableViewer";
import {GraphViewer} from "../Viewers/GraphViewer/GraphViewer";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SettingsContext} from "../Settings/SettingsContext";
import {getPlotSeries} from "../../services/plotService";

interface AreaProps {
    areaName: string;
}

export const Area: FunctionComponent<AreaProps> = ({areaName}) => {
    const [data, setData] = useState<AreaData | null>(null);
    const {viewer, metric, startDate, endDate} = useContext(SettingsContext);

    useEffect(() => {
        getAreaData(areaName).then(areaData => setData(areaData));
    }, [areaName]);
    
    if (!data) {
        return <div>Loading</div>
    }
    
    const timeSeries = getPlotSeries(data.timeSeries, metric, startDate, endDate);
    const viewerComponent = viewer === "Graph" ? 
        <GraphViewer graphData={timeSeries}/> : 
        <TableViewer graphData={timeSeries}/>;
    
    return (
        <section>
            <h2>{areaName} - {metric.label}</h2>
            {viewerComponent}
        </section>
    );
};
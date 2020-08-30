import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {RawDataViewer} from "../RawData/RawDataViewer";
import {GraphViewer} from "../Graph/GraphViewer";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SettingsContext} from "../Settings/SettingsContext";
import {getPlotSeries} from "../../services/plotService";

interface AreaProps {
    areaName: string;
}

export const Area: FunctionComponent<AreaProps> = ({areaName}) => {
    const [data, setData] = useState<AreaData | null>(null);
    const {viewer, metric} = useContext(SettingsContext);

    useEffect(() => {
        getAreaData(areaName).then(areaData => setData(areaData));
    }, [areaName]);
    
    if (!data) {
        return <div>Loading</div>
    }
    
    const timeSeries = getPlotSeries(data.timeSeries, metric);
    const viewerComponent = viewer === "Graph" ? 
        <GraphViewer graphData={timeSeries}/> : 
        <RawDataViewer graphData={timeSeries}/>;
    
    return (
        <section>
            <h2>{areaName} - {metric}</h2>
            {viewerComponent}
        </section>
    );
};
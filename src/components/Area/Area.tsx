import React, {FunctionComponent, useContext, useEffect, useState} from "react";
import {RawDataViewer} from "../RawData/RawDataViewer";
import {GraphViewer} from "../Graph/GraphViewer";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {SettingsContext} from "../Settings/SettingsContext";

interface AreaProps {
    areaName: string;
}

export const Area: FunctionComponent<AreaProps> = ({areaName}) => {
    const [data, setData] = useState<AreaData | null>(null);
    const {viewer} = useContext(SettingsContext);

    useEffect(() => {
        getAreaData(areaName).then(areaData => setData(areaData));
    }, [areaName]);
    
    if (!data) {
        return <div>Loading</div>
    }
    
    const viewerComponent = viewer === "Graph" ? 
        <GraphViewer rawData={data.cases}/> : 
        <RawDataViewer rawData={data.cases}/>;
    
    return (
        <section>
            <h2>{areaName}</h2>
            {viewerComponent}
        </section>
    );
};
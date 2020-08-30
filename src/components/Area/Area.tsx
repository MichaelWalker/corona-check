import React, {FunctionComponent, useEffect, useState} from "react";
import {RawDataViewer} from "../RawData/RawDataViewer";
import {Mode} from "../App/App";
import {GraphViewer} from "../Graph/GraphViewer";
import {AreaData, getAreaData} from "../../services/dataProcessor";

interface AreaProps {
    areaName: string;
    mode: Mode;
}

export const Area: FunctionComponent<AreaProps> = ({areaName, mode}) => {
    const [data, setData] = useState<AreaData | null>(null);
    
    useEffect(() => {
        getAreaData(areaName).then(areaData => setData(areaData));
    }, [areaName]);
    
    if (!data) {
        return <div>Loading</div>
    }
    
    const viewer = mode === "graph" ? <GraphViewer rawData={data.cases}/> : <RawDataViewer rawData={data.cases}/>;
    return (
        <section>
            <h2>{areaName}</h2>
            {viewer}
        </section>
    );
};
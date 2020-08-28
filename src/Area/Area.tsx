import React, {FunctionComponent, useEffect, useState} from "react";
import {AreaData, fetchDataForArea} from "../services/coronaDataFetcher";
import {RawDataViewer} from "../RawData/RawDataViewer";
import {Mode} from "../App";
import {GraphViewer} from "../Graph/GraphViewer";

interface AreaProps {
    areaName: string;
    mode: Mode;
}

export const Area: FunctionComponent<AreaProps> = ({areaName, mode}) => {
    const [data, setData] = useState<AreaData[]>([]);
    
    useEffect(() => {
        fetchDataForArea(areaName).then(areaData => setData(areaData));
    }, [areaName]);
    
    if (data.length === 0) {
        return <div>Loading</div>
    }
    
    const viewer = mode === "graph" ? <GraphViewer rawData={data}/> : <RawDataViewer rawData={data}/>;
    return (
        <div>
            <h2>{areaName}</h2>
            {viewer}
        </div>
    );
};
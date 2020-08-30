﻿import React, {FunctionComponent} from "react";
import {GraphData} from "../../services/plotService";

interface RawDataViewerProps {
    graphData: GraphData
}

export const RawDataViewer: FunctionComponent<RawDataViewerProps> = ({ graphData }) => {
    return (
        <ol>
            {graphData.map(dataPoint => <li>Date: {dataPoint.date.format()}, Value: {dataPoint.value}</li>)}
        </ol>
    );
};

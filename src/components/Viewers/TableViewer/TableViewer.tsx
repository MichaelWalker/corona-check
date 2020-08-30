import React, {FunctionComponent} from "react";
import {GraphData} from "../../../services/plotService";

interface TableViewerProps {
    graphData: GraphData
}

export const TableViewer: FunctionComponent<TableViewerProps> = ({ graphData }) => {
    return (
        <ol>
            {graphData.map(dataPoint => <li>Date: {dataPoint.date.format()}, Value: {dataPoint.value}, Rolling Average: {dataPoint.rollingAverage}</li>)}
        </ol>
    );
};

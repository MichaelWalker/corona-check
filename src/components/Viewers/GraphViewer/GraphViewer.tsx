import React, {FunctionComponent, ReactElement} from "react";
import {Bar, ComposedChart, Line, XAxis, YAxis} from "recharts";
import {GraphData} from "../../../services/plotService";

interface GraphViewerProps {
    graphData: GraphData
}

const hasRollingAverage = (graphData: GraphData): boolean => {
    let hasAverage = false;
    graphData.forEach(dataPoint => {
        if (dataPoint.rollingAverage !== undefined) {
            hasAverage = true;
            return;
        }
    });
    return hasAverage; 
};

export const GraphViewer: FunctionComponent<GraphViewerProps> = ({graphData}) => {
    let plots: ReactElement[] = [];
    if (hasRollingAverage(graphData)) {
        plots = [
            <Bar dataKey="value" stroke="#8884d8" />,
            <Line type="monotone" dataKey="rollingAverage" stroke="#8884d8" />
        ]
    }
    else {
        plots = [
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        ]
    }
    return (
        <ComposedChart width={1500} height={300} data={graphData}>
            <XAxis dataKey={"date"}/>
            <YAxis/>
            {plots}
        </ComposedChart>
    );
};
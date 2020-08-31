import React, {FunctionComponent, ReactElement} from "react";
import {Bar, ComposedChart, Line, XAxis, YAxis} from "recharts";
import {GraphData} from "../../../services/plotService";
import moment from "moment";

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
            <XAxis dataKey={"timestamp"} 
                   domain={['dataMin - 50000', 'dataMax + 50000']} 
                   type="number" 
                   tickFormatter={timestamp => moment.unix(timestamp).format("DD-MMM")}/>
            <YAxis/>
            {plots}
        </ComposedChart>
    );
};
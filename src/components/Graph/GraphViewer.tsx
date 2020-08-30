import React, {FunctionComponent} from "react";
import {Line, LineChart, XAxis, YAxis} from "recharts";
import {GraphData} from "../../services/plotService";

interface GraphViewerProps {
    graphData: GraphData
}

export const GraphViewer: FunctionComponent<GraphViewerProps> = ({graphData}) => {
    return (
        <div>
            <LineChart width={1500} height={300} data={graphData}>
                <XAxis dataKey={"date"}/>
                <YAxis/>
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};
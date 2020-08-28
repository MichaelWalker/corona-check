import React, {FunctionComponent} from "react";
import {AreaData} from "../services/coronaDataFetcher";
import {CartesianGrid, Line, LineChart, XAxis, YAxis} from "recharts";

interface GraphViewerProps {
    rawData: AreaData[]
}

export const GraphViewer: FunctionComponent<GraphViewerProps> = ({rawData}) => {
    return (
        <div>
            <LineChart width={1500} height={300} data={rawData}>
                <XAxis dataKey={"date"}/>
                <YAxis/>
                <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                <Line type="monotone" dataKey="newCases" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};
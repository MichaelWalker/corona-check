import React, {FunctionComponent} from "react";
import styles from "./CustomisableChart.module.scss";
import {Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {DataPoint, TimeSeries} from "../../../services/dataStructures";
import moment from "moment";

interface CustomisableChartProps {
    data: TimeSeries;
    dataKey: keyof DataPoint;
}

export const CustomisableChart: FunctionComponent<CustomisableChartProps> = ({data, dataKey}) => {
    console.log(data);
    return (
        <div className={styles.container}>
            <ResponsiveContainer>
                <ComposedChart data={data} >
                    <Bar dataKey={dataKey} fill={"#413ea0"}/>
                    <XAxis dataKey={"timestamp"} 
                           type={"number"} 
                           domain={['dataMin', 'dataMax']}
                           scale={"utc"}
                           tickFormatter={timestamp => moment.unix(timestamp).format("DD-MMM")}
                           interval={"preserveEnd"}
                    />
                    <YAxis width={40}/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

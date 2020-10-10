import React, {FunctionComponent} from "react";
import styles from "./CustomisableChart.module.scss";
import {Area, Bar, Brush, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import moment from "moment";
import {MetricDataPoint} from "../../../services/dataProcessor";

interface CustomisableChartProps {
    data: MetricDataPoint[] | null;
}

export const CustomisableChart: FunctionComponent<CustomisableChartProps> = ({data}) => {
    if (!data) {
        return <div>Insufficient Data</div>
    }
    
    const chartType = hasRollingAverage(data) ? "bar" : "area";
    return (
        <div className={styles.container}>
            <ResponsiveContainer>
                <ComposedChart data={data} >
                    {chartType === "bar" && <Bar dataKey={"value"} fill={"#413ea0"}/>}
                    {chartType === "area" && <Area dataKey={"value"} type={"monotone"} fill={"#8884d8"}/>}
                    {hasRollingAverage(data) && <Line dataKey={"rollingAverage"} fill={"#413ea0"} dot={false} activeDot={true}/>} 
                    <XAxis dataKey={"timestamp"} 
                           type={"number"} 
                           domain={['dataMin - 36000', 'dataMax + 36000']}
                           scale={"utc"}
                           tickFormatter={timestamp => moment.unix(timestamp).format("DD-MMM")}
                           interval={"preserveEnd"}
                    />
                    <YAxis width={50}
                           domain={["dataMin", "auto"]} 
                           allowDataOverflow={true} 
                           allowDecimals={true}
                    />
                    <Brush dataKey='timestamp' 
                           height={30} 
                           stroke="#8884d8" 
                           tickFormatter={timestamp => moment.unix(timestamp).format("DD-MMM")}
                    />
                    <Tooltip labelFormatter={timestamp => moment.unix(parseInt(timestamp.toString())).format("DD-MMM")}
                             formatter={input => Math.round(parseInt(input.toString()))}
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

const hasRollingAverage = (data: MetricDataPoint[]): boolean => {
    const withRollingAverage = data.filter(d => d.rollingAverage !== undefined);
    return withRollingAverage.length > 5;
}

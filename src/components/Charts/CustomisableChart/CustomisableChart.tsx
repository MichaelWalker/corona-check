import React, {FunctionComponent} from "react";
import styles from "./CustomisableChart.module.scss";
import {Bar, Brush, ComposedChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {DataPoint, TimeSeries} from "../../../services/dataStructures";
import moment from "moment";

interface CustomisableChartProps {
    data: TimeSeries;
    dataKey: keyof DataPoint;
    rollingAverageKey?: keyof DataPoint | undefined;
    scale: "auto" | "log";
}

interface TooltipProps {
    active?: any;
    payload?: any[];
    label?: any;
}

export const CustomisableChart: FunctionComponent<CustomisableChartProps> = ({data, dataKey, rollingAverageKey, scale }) => {
    const safeData = makeLogSafe(data, dataKey);
    
    return (
        <div className={styles.container}>
            <ResponsiveContainer>
                <ComposedChart data={safeData} >
                    <Bar dataKey={dataKey} fill={"#413ea0"}/>
                    {rollingAverageKey && <Line dataKey={rollingAverageKey} fill={"#413ea0"}/>} 
                    <XAxis dataKey={"timestamp"} 
                           type={"number"} 
                           domain={['dataMin - 36000', 'dataMax + 36000']}
                           scale={"utc"}
                           tickFormatter={timestamp => moment.unix(timestamp).format("DD-MMM")}
                           interval={"preserveEnd"}
                    />
                    <YAxis width={50} 
                           scale={scale} 
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

const makeLogSafe = (data: TimeSeries, dataKey: keyof DataPoint): TimeSeries => {
    data.forEach(dataPoint => {
        // @ts-ignore
        dataPoint[dataKey] = logSafe(dataPoint[dataKey] as number | null);
    });
    return data;    
};

const logSafe = (input: number | null): number => {
    if (input === null || input === 0) {
        return 0.0001;
    }
    return input;
};

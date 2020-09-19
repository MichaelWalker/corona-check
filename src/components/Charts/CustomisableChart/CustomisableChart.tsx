import React, {FunctionComponent} from "react";
import styles from "./CustomisableChart.module.scss";
import {Bar, ComposedChart, ResponsiveContainer, XAxis, YAxis} from "recharts";
import {DataPoint, TimeSeries} from "../../../services/dataStructures";
import moment from "moment";

interface CustomisableChartProps {
    data: TimeSeries;
    dataKey: keyof DataPoint;
    scale: "auto" | "log";
}

export const CustomisableChart: FunctionComponent<CustomisableChartProps> = ({data, dataKey, scale }) => {
    const safeData = makeLogSafe(data, dataKey);
    
    return (
        <div className={styles.container}>
            <ResponsiveContainer>
                <ComposedChart data={safeData} >
                    <Bar dataKey={dataKey} fill={"#413ea0"}/>
                    <XAxis dataKey={"timestamp"} 
                           type={"number"} 
                           domain={['dataMin', 'dataMax']}
                           scale={"utc"}
                           tickFormatter={timestamp => moment.unix(timestamp).format("DD-MMM")}
                           interval={"preserveEnd"}
                    />
                    <YAxis width={40} 
                           scale={scale} 
                           domain={[1, "auto"]} 
                           allowDataOverflow={true} 
                           allowDecimals={true}
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

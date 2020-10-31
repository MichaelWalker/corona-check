import React, {FunctionComponent} from "react";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import styles from "./SimpleAreaChart.module.scss";
import {MetricDataPoint} from "../../../services/processingHelpers";

interface AreaChartProps {
    data: MetricDataPoint[];
    color: string;
}

export const SimpleAreaChart: FunctionComponent<AreaChartProps> = ({data, color}) => {
    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{right: 0}}>
                    <Area dataKey={"rollingAverage"} type={"monotone"} fill={color} strokeWidth={0}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
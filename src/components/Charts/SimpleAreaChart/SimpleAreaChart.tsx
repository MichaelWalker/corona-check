import React, {FunctionComponent} from "react";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import styles from "./SimpleAreaChart.module.scss";
import {MetricDataPoint} from "../../../services/dataProcessor";

interface AreaChartProps {
    data: MetricDataPoint[];
    isLarge: boolean;
}

export const SimpleAreaChart: FunctionComponent<AreaChartProps> = ({data, isLarge}) => {
    return (
        <div className={`${styles.chartContainer} ${isLarge ? styles.largeContainer : ""}`}>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{right: 0}}>
                    <Area dataKey={"rollingAverage"} type={"monotone"} fill={"#8884d8"}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
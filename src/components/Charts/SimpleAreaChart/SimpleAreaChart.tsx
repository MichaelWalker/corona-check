import React, {FunctionComponent} from "react";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import styles from "./SimpleAreaChart.module.scss";
import {MetricDataPoint} from "../../../services/processingHelpers";

interface AreaChartProps {
    data: MetricDataPoint[];
}

export const SimpleAreaChart: FunctionComponent<AreaChartProps> = ({data}) => {
    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{right: 0}}>
                    <Area dataKey={"rollingAverage"} type={"monotone"} fill={"#8884d8"}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
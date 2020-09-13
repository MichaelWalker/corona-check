import React, {FunctionComponent} from "react";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import {DataPoint, TimeSeries} from "../../../services/dataStructures";
import styles from "./SimpleAreaChart.module.scss";

interface AreaChartProps {
    data: TimeSeries;
    dataKey: keyof DataPoint;
}

export const SimpleAreaChart: FunctionComponent<AreaChartProps> = ({data, dataKey}) => {
    return (
        <div className={styles.chartContainer}>
            <ResponsiveContainer>
                <AreaChart data={data} margin={{right: 0}}>
                    <Area dataKey={dataKey} type={"monotone"} fill={"#8884d8"}/>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};
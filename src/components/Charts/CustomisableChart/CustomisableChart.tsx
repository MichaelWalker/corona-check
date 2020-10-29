import React, {FunctionComponent, useState} from "react";
import styles from "./CustomisableChart.module.scss";
import {
    Area,
    Bar,
    ComposedChart,
    Line,
    ReferenceArea,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import moment from "moment";
import {ZoomOutIcon} from "../../Icons/ZoomOutIcon";
import {MetricDataPoint} from "../../../services/processingHelpers";

interface CustomisableChartProps {
    data: MetricDataPoint[] | null;
}

const defaultDataMin = 'dataMin - 36000';
const defaultDataMax = 'dataMax + 36000';

export const CustomisableChart: FunctionComponent<CustomisableChartProps> = ({data}) => {
    const [dragStart, setDragStart] = useState<number | undefined>(undefined);
    const [dragEnd, setDragEnd] = useState<number | undefined>(undefined);
    const [specifiedDataMin, setSpecifiedDataMin] = useState<number | undefined>();
    const [specifiedDataMax, setSpecifiedDataMax] = useState<number | undefined>();
    
    
    if (!data) {
        return <div>Insufficient Data</div>
    }
    
    const chartType = hasRollingAverage(data) ? "bar" : "area";
    const hasReferenceArea = dragStart !== undefined && dragEnd !== undefined;
    const dataMin = specifiedDataMin || defaultDataMin;
    const dataMax = specifiedDataMax || defaultDataMax;
    const isZoomedIn = specifiedDataMin !== undefined;
    
    const getPlottedData = (): MetricDataPoint[] => {
        return data
            .filter(d => specifiedDataMin === undefined || d.timestamp >= specifiedDataMin)
            .filter(d => specifiedDataMax === undefined || d.timestamp <= specifiedDataMax);
    };

    const zoom = () => {
        if (hasReferenceArea) {
            if (Number.isNaN(dragEnd!)) {
                setSpecifiedDataMin(dragStart! - 36000);
            }
            else {
                setSpecifiedDataMin(Math.min(dragStart!, dragEnd!) - 36000);
                setSpecifiedDataMax(Math.max(dragStart!, dragEnd!) + 36000);
            }
        }
        setDragStart(undefined);
        setDragEnd(undefined);
    };
    
    const zoomOut = () => {
        setDragStart(undefined);
        setDragEnd(undefined);
        setSpecifiedDataMin(undefined);
        setSpecifiedDataMax(undefined);
    };
    
    return (
        <div className={styles.container}>
            {isZoomedIn && <button className={styles.zoomOutButton} onClick={zoomOut}><ZoomOutIcon/></button>}
            <ResponsiveContainer>
                <ComposedChart 
                    data={getPlottedData()}
                    onMouseDown={e => { if (e && e.activeLabel) { setDragStart(parseInt(e.activeLabel)) }}}
                    onMouseMove={e => { if (dragStart !== undefined && e && e.activeLabel) { setDragEnd(parseInt(e.activeLabel)) }}}
                    onMouseUp={zoom}
                >
                    {chartType === "bar" && <Bar dataKey={"value"} fill={"#004293"} fillOpacity={0.3}/>}
                    {chartType === "area" && <Area dataKey={"value"} type={"monotone"} fill={"#004293"}/>}
                    {hasRollingAverage(data) && <Line dataKey={"rollingAverage"} stroke={"#004293"} strokeWidth={3} dot={false} activeDot={true}/>} 
                    <XAxis dataKey={"timestamp"} 
                           type={"number"} 
                           domain={[dataMin, dataMax]}
                           scale={"utc"}
                           tickFormatter={timestamp => moment.unix(timestamp).format("DD-MMM")}
                           interval={"preserveEnd"}
                    />
                    <YAxis width={50}
                           domain={["dataMin", "auto"]} 
                           allowDataOverflow={true} 
                           allowDecimals={true}
                    />
                    <Tooltip labelFormatter={timestamp => moment.unix(parseInt(timestamp.toString())).format("DD-MMM")}
                             formatter={input => Math.round(parseInt(input.toString()))}
                    />
                    { hasReferenceArea && <ReferenceArea x1={dragStart} x2={dragEnd} strokeOpacity={0.3}/>}
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

const hasRollingAverage = (data: MetricDataPoint[]): boolean => {
    const withRollingAverage = data.filter(d => d.rollingAverage !== undefined);
    return withRollingAverage.length > 5;
};

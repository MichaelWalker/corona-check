import React, {FunctionComponent, useState} from "react";
import styles from "./CustomisableChart.module.scss";
import {
    Area,
    Bar,
    Brush,
    ComposedChart,
    Line,
    ReferenceArea,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import moment from "moment";
import {MetricDataPoint} from "../../../services/dataProcessor";
import {ZoomOutIcon} from "../../Icons/ZoomOutIcon";

interface CustomisableChartProps {
    data: MetricDataPoint[] | null;
}

const defaultDataMin = 'dataMin - 36000';
const defaultDataMax = 'dataMax + 36000';

export const CustomisableChart: FunctionComponent<CustomisableChartProps> = ({data}) => {
    const [dragStart, setDragStart] = useState<number | undefined>(undefined);
    const [dragEnd, setDragEnd] = useState<number | undefined>(undefined);
    const [dataMin, setDataMin] = useState<number | string>(defaultDataMin);
    const [dataMax, setDataMax] = useState<number | string>(defaultDataMax);
    const [plottedData, setPlottedData] = useState(data);
    const [isZoomedIn, setZoomedIn] = useState(false);
    
    const hasReferenceArea = dragStart !== undefined && dragEnd !== undefined;
    
    if (!data) {
        return <div>Insufficient Data</div>
    }
    
    const chartType = hasRollingAverage(data) ? "bar" : "area";

    const zoom = () => {
        if (hasReferenceArea) {
            const minTimestamp = defaultDataMin;
            const maxTimestamp = defaultDataMax;
            if (Number.isNaN(dragEnd!)) {
                const minTimestamp = dragStart! - 36000;
                setPlottedData(data.filter(d => d.timestamp > minTimestamp));
            }
            else {
                const minTimestamp = Math.min(dragStart!, dragEnd!) - 36000;
                const maxTimestamp = Math.max(dragStart!, dragEnd!) + 36000;
                setPlottedData(data.filter(d => d.timestamp > minTimestamp).filter(d => d.timestamp < maxTimestamp));
            }
            setDataMin(minTimestamp);
            setDataMax(maxTimestamp);
            setZoomedIn(true);
        }
        setDragStart(undefined);
        setDragEnd(undefined);
    };
    
    const zoomOut = () => {
        setDragStart(undefined);
        setDragEnd(undefined);
        setDataMin(defaultDataMin);
        setDataMax(defaultDataMax);
        setPlottedData(data);
        setZoomedIn(false);
    };
    
    return (
        <div className={styles.container}>
            {isZoomedIn && <button className={styles.zoomOutButton} onClick={zoomOut}><ZoomOutIcon/></button>}
            <ResponsiveContainer>
                <ComposedChart 
                    data={plottedData!}
                    onMouseDown={e => setDragStart(parseInt(e.activeLabel))}
                    onMouseMove={e => dragStart !== undefined && setDragEnd(parseInt(e.activeLabel))}
                    onMouseUp={zoom}
                >
                    {chartType === "bar" && <Bar dataKey={"value"} fill={"#413ea0"}/>}
                    {chartType === "area" && <Area dataKey={"value"} type={"monotone"} fill={"#8884d8"}/>}
                    {hasRollingAverage(data) && <Line dataKey={"rollingAverage"} fill={"#413ea0"} dot={false} activeDot={true}/>} 
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
}

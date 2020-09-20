import React, {FunctionComponent, useState} from "react";
import styles from "./MetricDetails.module.scss";
import {AreaData} from "../../services/dataProcessor";
import {StatRow} from "../Stats/StatRow/StatRow";
import {CustomisableChart} from "../Charts/CustomisableChart/CustomisableChart";
import {Checkbox} from "../Inputs/Checkbox/Checkbox";
import {Select} from "../Inputs/Select/Select";
import {DataPoint} from "../../services/dataStructures";
import {StatCategory} from "../../services/statService";

interface MetricProps {
    name: string;
    data: AreaData | undefined;
    plotOptions: PlotOption[];
    statCategory: StatCategory | undefined;
}

interface PlotConfig {
    key: keyof DataPoint;
    rollingAverageKey?: keyof DataPoint | undefined;
    chartType: "bar" | "area";
}

export interface PlotOption {
    label: string;
    value: PlotConfig;
}

interface CardContentProps {
    data: AreaData;
    plotOptions: PlotOption[];
    statCategory: StatCategory;
}

export const MetricDetails: FunctionComponent<MetricProps> = ({ name, data, plotOptions, statCategory }) => {
    return (
        <section className={styles.card}>
            <h2 className={styles.header}>{name}</h2>
            { data ? <CardContent data={data} plotOptions={plotOptions} statCategory={statCategory!}/> : <div>Loading</div> }
        </section>
    );  
};

const CardContent: FunctionComponent<CardContentProps> = ({data, plotOptions, statCategory}) => {
    const [logAxis, setLogAxis] = useState(false);
    const [plotConfig, setPlotConfig] = useState<PlotOption>(plotOptions[0]);
    const [showRollingAverage, setShowRollingAverage] = useState(true);
    
    const chartType = plotConfig.value.chartType;
    
    const updatePlotConfig = (newLabel: string) => {
        const plotOption = plotOptions.find(plot => plot.label === newLabel);
        setPlotConfig(plotOption!);
    };
    
    const rollingAverageKey = (): keyof DataPoint | undefined=> {
        if (!showRollingAverage) {
            return undefined;
        }  
        return plotConfig.value.rollingAverageKey;
    };
    
    return (
        <div>
            <StatRow statCategory={statCategory}/>
            <CustomisableChart data={data.timeSeries} 
                               dataKey={plotConfig.value.key}
                               rollingAverageKey={rollingAverageKey()}
                               scale={logAxis ? "log" : "auto"}
                               chartType={chartType}
            />
            <div className={styles.controls}>
                <Checkbox label={"Log Axis"} value={logAxis} onChange={setLogAxis}/>
                <Select label={"Metric"} value={plotConfig.label} options={plotOptions} onChange={updatePlotConfig}/>
                {chartType === "bar" && <Checkbox label="Show Rolling Average" value={showRollingAverage} onChange={setShowRollingAverage}/>}
            </div>
        </div>
    );
};
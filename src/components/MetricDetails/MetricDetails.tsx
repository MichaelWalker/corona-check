import React, {FunctionComponent, useState} from "react";
import styles from "./MetricDetails.module.scss";
import {AreaData} from "../../services/dataProcessor";
import {StatRow} from "../Stats/StatRow/StatRow";
import {CustomisableChart} from "../Charts/CustomisableChart/CustomisableChart";
import {Checkbox} from "../Inputs/Checkbox/Checkbox";
import {Option, Select} from "../Inputs/Select/Select";
import {DataPoint} from "../../services/dataStructures";

interface MetricProps {
    name: string;
    data: AreaData | undefined;
}

export const MetricDetails: FunctionComponent<MetricProps> = ({ name, data }) => {
    return (
        <section className={styles.card}>
            <h2 className={styles.header}>{name}</h2>
            { data ? <CardContent data={data}/> : <div>Loading</div> }
        </section>
    );  
};

interface CardContentProps {
    data: AreaData;
}

interface PlotConfig {
    key: keyof DataPoint;
    rollingAverageKey?: keyof DataPoint | undefined;
    chartType: "bar" | "area";
}

interface PlotOption {
    label: string;
    value: PlotConfig;
}

const plotOptions: PlotOption[] = [
    { label: "Daily (best available data)", value: { chartType: "bar", key: "newCases", rollingAverageKey: "newCasesRollingAverage" } },
    { label: "Daily (by publish date)", value: { chartType: "bar", key: "newCasesByPublishDate", rollingAverageKey: "newCasesByPublishDateRollingAverage" } },
    { label: "Daily (by specimen date)", value: { chartType: "bar", key: "newCasesBySpecimenDate", rollingAverageKey: "newCasesBySpecimenDateRollingAverage" } },
    { label: "Cumulative (by publish date)", value: { chartType: "area", key: "cumulativeCasesByPublishDate" } },
    { label: "Cumulative (by specimen date)", value: { chartType: "area", key: "cumulativeCasesBySpecimenDate" } },
];

const CardContent: FunctionComponent<CardContentProps> = ({data}) => {
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
            <StatRow label={"Cases"} statCategory={data.stats.cases} showLabel={false}/>
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
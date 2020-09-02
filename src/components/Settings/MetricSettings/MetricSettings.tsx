import React, {ChangeEvent, FunctionComponent} from "react";
import {Metric, METRICS} from "../../../config/options";

interface MetricSettingsProps {
    metric: Metric;
    setMetric: (metric: Metric) => void;
}

export const MetricSettings: FunctionComponent<MetricSettingsProps> = ({metric, setMetric}) => {
    const updateMetric = (event: ChangeEvent<HTMLSelectElement>) => {
        const label = event.target.value;
        const newMetric = METRICS.find(m => m.label === label);
        setMetric(newMetric!);
    };
    
    return (
        <label>Metric
            <select value={metric.label} onChange={updateMetric}>
                {METRICS.map(m => <option>{m.label}</option>)}
            </select>
        </label>
    );
};
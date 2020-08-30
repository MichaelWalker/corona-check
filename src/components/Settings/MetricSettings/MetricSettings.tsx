import React, {FunctionComponent} from "react";
import {Metric} from "../../../config/options";

interface MetricSettingsProps {
    metric: Metric;
    setMetric: (metric: Metric) => void;
}

export const MetricSettings: FunctionComponent<MetricSettingsProps> = ({metric, setMetric}) => {
    return (
        <label>Metric
            <select value={metric} onChange={(event) => setMetric(event.target.value as Metric)}>
                <option>Total Cases</option>
                <option>Total Cases Per Population</option>
                <option>New Cases</option>
                <option>New Cases Per Population</option>
                <option>Total Admissions</option>
                <option>Total Admissions Per Population</option>
                <option>New Admissions</option>
                <option>New Admissions Per Population</option>
                <option>Total Deaths</option>
                <option>Total Deaths Per Population</option>
                <option>New Deaths</option>
                <option>New Deaths Per Population</option>
                <option>Hospital Cases</option>
                <option>Hospital Capacity</option>
                <option>Hospital Utilisation</option>
            </select>
        </label>
    );
};
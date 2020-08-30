import React, {FunctionComponent} from "react";
import {Metric, ViewerMode} from "./SettingsContext";

interface MetricSettingsProps {
    metric: Metric;
    setMetric: (metric: Metric) => void;
}

export const MetricSettings: FunctionComponent<MetricSettingsProps> = ({metric, setMetric}) => {
    return (
        <label>Metric
            <select value={metric} onChange={(event) => setMetric(event.target.value as Metric)}>
                <option>Total Cases</option>
                <option>Total Cases Rate</option>
                <option>New Cases</option>
                <option>New Cases Rate</option>
                <option>Total Admissions</option>
                <option>Total Admissions Rate</option>
                <option>New Admissions</option>
                <option>New Admissions Rate</option>
                <option>Total Deaths</option>
                <option>Total Deaths Rate</option>
                <option>New Deaths</option>
                <option>New Deaths Rate</option>
                <option>Hospital Cases</option>
                <option>Hospital Capacity</option>
                <option>Hospital Utilisation</option>
            </select>
        </label>
    );
};
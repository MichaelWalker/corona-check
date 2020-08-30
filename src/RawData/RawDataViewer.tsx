import React, {FunctionComponent} from "react";
import {DataPoint} from "../services/dataProcessor";

interface RawDataViewerProps {
    rawData: DataPoint[]
}

export const RawDataViewer: FunctionComponent<RawDataViewerProps> = ({ rawData }) => {
    return (
        <ol>
            {rawData.map(day => <li>Date: {day.date.format()}, Total Cases: {day.cumulative}, New Cases: {day.new}</li>)}
        </ol>
    );
};

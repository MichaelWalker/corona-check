import React, {FunctionComponent} from "react";
import {AreaData} from "../services/coronaDataFetcher";

interface RawDataViewerProps {
    rawData: AreaData[]
}

export const RawDataViewer: FunctionComponent<RawDataViewerProps> = ({ rawData }) => {
    return (
        <ol>
            {rawData.map(day => <li>Date: {day.date.format()}, Total Cases: {day.cumulativeCases}, New Cases: {day.newCases}</li>)}
        </ol>
    );
};

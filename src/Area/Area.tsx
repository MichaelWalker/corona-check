import React, {FunctionComponent, useEffect, useState} from "react";
import {AreaData, fetchDataForArea} from "../services/coronaDataFetcher";

interface AreaProps {
    areaName: string;
}

export const Area: FunctionComponent<AreaProps> = ({areaName}) => {
    const [data, setData] = useState<AreaData[]>([]);
    
    useEffect(() => {
        fetchDataForArea(areaName).then(areaData => setData(areaData));
    }, [areaName]);
    
    if (data.length === 0) {
        return <div>Loading</div>
    }
    return (
        <div>
            <h2>{areaName}</h2>
            <ol>
                {data.map(day => <li>Date: {day.date}, Total Cases: {day.cumCasesBySpecimenDate}, New Cases: {day.newCasesBySpecimenDate}</li>)}
            </ol>
        </div>
    );
};
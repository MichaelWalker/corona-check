import React, {FunctionComponent, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import styles from "./AreaPage.module.scss";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {MetricDetails} from "../MetricDetails/MetricDetails";

export const AreaPage: FunctionComponent = () => {
    const { name } = useParams();
    const [ data, setData ] = useState<AreaData | undefined>(undefined);
    
    useEffect(() => {
        getAreaData(name)
            .then(areaData => setData(areaData));
    }, [name]);
    
    if (!data) {
        return <div>Loading...</div>
    }
    
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>{name}</h1>
            <div className={styles.metrics}>
                <MetricDetails name={"Cases"} metricCategory={data.cases}/>
                <MetricDetails name={"Admissions"} metricCategory={data.admissions}/>
                <MetricDetails name={"Deaths"} metricCategory={data.deaths}/>
                <MetricDetails name={"Hospitalisation"} metricCategory={data.hospitalisation}/>
            </div>
        </div>
    );
};

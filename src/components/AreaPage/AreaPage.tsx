import React, {FunctionComponent, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import styles from "./AreaPage.module.scss";
import {MetricDetails} from "../MetricDetails/MetricDetails";
import {AreaData, getAreaData} from "../../services/dataProcessor";

export const AreaPage: FunctionComponent = () => {
    const { name } = useParams();
    const [ data, setData ] = useState<AreaData | undefined>(undefined);
    
    useEffect(() => {
        getAreaData(name)
            .then(areaData => setData(areaData));
    }, [name]);
    
    return (
        <div className={styles.page}>
            <h1 className={styles.title}>{name}</h1>
            <div className={styles.metrics}>
                <MetricDetails name={"Cases"} data={data}/>
            </div>
        </div>
    );
};

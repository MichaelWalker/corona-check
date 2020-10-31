import React, {FunctionComponent} from "react";
import {Section} from "../Section/Section";
import {AreaData} from "../../services/dataProcessor";
import {MetricDetails} from "../MetricDetails/MetricDetails";
import styles from "./DetailsSection.module.scss";

interface DetailsSectionProps {
    data: AreaData | undefined;
}

export const DetailsSection: FunctionComponent<DetailsSectionProps> = ({data}) => {
    if (!data) {
        return <div>Loading...</div>
    }
    
    return (
        <Section title={"Details"}>
            <div className={styles.metrics}>
                <MetricDetails name={"Cases"} metricCategory={data.cases}/>
                <MetricDetails name={"Admissions"} metricCategory={data.admissions}/>
                <MetricDetails name={"Deaths"} metricCategory={data.deaths}/>
                <MetricDetails name={"Hospitalisation"} metricCategory={data.hospitalisation}/>
            </div>
        </Section>
    );
};

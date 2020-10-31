import React, {FunctionComponent} from "react";
import {Section} from "../Section/Section";
import {SummaryCard} from "../SummaryCard/SummaryCard";
import {AreaData} from "../../services/dataProcessor";

interface OverviewSectionProps {
    data: AreaData | undefined;
}

export const OverviewSection: FunctionComponent<OverviewSectionProps> = ({data}) => {
    return (
        <Section title={"Overview"}>
            <SummaryCard data={data}/>
        </Section>
    );
};

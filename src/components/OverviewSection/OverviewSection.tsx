import React, {FunctionComponent} from "react";
import {Section} from "../Section/Section";
import {AreaData} from "../../services/dataProcessor";
import {OverviewCard} from "../OverviewCard/OverviewCard";

interface OverviewSectionProps {
    data: AreaData | undefined;
}

export const OverviewSection: FunctionComponent<OverviewSectionProps> = ({data}) => {
    return (
        <Section>
            <OverviewCard data={data}/>
        </Section>
    );
};

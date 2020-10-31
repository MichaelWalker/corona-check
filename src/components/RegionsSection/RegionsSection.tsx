import React, {FunctionComponent} from "react";
import {Section} from "../Section/Section";
import {AreaType} from "../../services/govUkApiClient";
import {SummaryLinkCard} from "../SummaryCard/SummaryCard";

interface RegionsSectionProps {
    
    areaType: AreaType;
    regions: string[];
}

export const RegionsSection: FunctionComponent<RegionsSectionProps> = ({areaType, regions}) => {
    return (
        <Section title={"Regions"}>
            {regions.map(name => <SummaryLinkCard areaName={name} areaType={areaType}/>)}
        </Section>
    );
};

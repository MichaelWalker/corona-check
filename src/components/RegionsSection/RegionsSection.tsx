import React, {FunctionComponent} from "react";
import {Section} from "../Section/Section";
import {AreaType} from "../../services/govUkApiClient";
import {SummaryCard} from "../SummaryCard/SummaryCard";
import styles from "./RegionsSection.module.scss";
import {MapData} from "../../services/mapDataService";
import {CaseRateMap} from "../Maps/Map";

interface RegionsSectionProps {
    areaType: AreaType;
    regions: string[];
    mapData: MapData | undefined;
}

export const RegionsSection: FunctionComponent<RegionsSectionProps> = ({areaType, regions, mapData}) => {
    return (
        <Section title={"Regions"}>
            <div className={styles.maps}>
                <CaseRateMap data={mapData || {}}/>
            </div>
            
            <div className={styles.regions}>
                {regions.map(name => <SummaryCard key={name} areaName={name} areaType={areaType}/>)}
            </div>
        </Section>
    );
};

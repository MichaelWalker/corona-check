import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./RegionPage.module.scss";
import {useParams} from "react-router-dom";
import {OverviewSection} from "../OverviewSection/OverviewSection";
import {RegionsSection} from "../RegionsSection/RegionsSection";
import {DetailsSection} from "../DetailsSection/DetailsSection";
import {getRegionConfig} from "../../config/regions";
import {AreaData, getAreaData} from "../../services/dataProcessor";
import {getUtlaMapData, MapData} from "../../services/mapDataService";

export const RegionPage: FunctionComponent = () => {
    const { areaName, areaType } = useParams();
    const [areaData, setAreaData] = useState<AreaData | undefined>();
    const [mapData, setMapData] = useState<MapData | undefined>();
    
    const regionConfig = getRegionConfig(areaName, areaType);
    
    useEffect(() => {
        getAreaData(areaName, areaType).then(setAreaData);
    }, [areaName, areaType]);
    
    useEffect(() => {
        getUtlaMapData().then(setMapData);
    }, [regionConfig]);
    
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>{areaName}</h1>
            <OverviewSection data={areaData}/>
            {regionConfig?.subRegions && <RegionsSection areaType={regionConfig.subRegions.type} regions={regionConfig.subRegions.names}/>}
            <DetailsSection data={areaData}/>
        </main>
    );    
};

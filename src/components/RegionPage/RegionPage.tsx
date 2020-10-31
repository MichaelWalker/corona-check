import React, {FunctionComponent} from "react";
import styles from "./RegionPage.module.scss";
import {useParams} from "react-router-dom";
import {OverviewSection} from "../OverviewSection/OverviewSection";
import {RegionsSection} from "../RegionsSection/RegionsSection";
import {DetailsSection} from "../DetailsSection/DetailsSection";
import {getRegionConfig} from "../../config/regions";

export const RegionPage: FunctionComponent = () => {
    const { areaName, areaType } = useParams();
    const regionConfig = getRegionConfig(areaName, areaType);
    
    return (
        <main className={styles.page}>
            <h1 className={styles.title}>{areaName}</h1>
            <OverviewSection/>
            {regionConfig && <RegionsSection/>}
            <DetailsSection/>
        </main>
    );    
};

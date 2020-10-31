import React, {FunctionComponent, useEffect, useState} from "react";
import styles from "./SummaryPage.module.scss";
import {SummaryCard} from "../SummaryCard/SummaryCard";
import {Map} from "../Maps/Map";
import {getUtlaMapData, MapData} from "../../services/mapDataService";

export const UkSummaryPage: FunctionComponent = () => {
    const [mapData, setMapData] = useState<MapData>({});
    
    useEffect(() => {
        getUtlaMapData().then(setMapData);
    }, []);
    
    return (
        <main className={styles.page}>
            <div className={styles.cardContainer}>
                <SummaryCard areaName={"United Kingdom"} areaType={"overview"}/>
                <Map data={mapData} hue={0}/>
                <Map data={mapData} hue={100}/>
                <Map data={mapData} hue={200}/>
                <SummaryCard areaName={"England"} areaType={"nation"}/>
                <SummaryCard areaName={"Scotland"} areaType={"nation"}/>
                <SummaryCard areaName={"Wales"} areaType={"nation"}/>
                <SummaryCard areaName={"Northern Ireland"} areaType={"nation"}/>
            </div>
        </main>
    );  
};

export const DevonSummaryPage: FunctionComponent = () => {
    return (
        <main className={styles.page}>
            <div className={styles.cardContainer}>
                <SummaryCard areaName={"Devon"} areaType={"utla"}/>
                <SummaryCard areaName={"East Devon"} areaType={"utla"}/>
                <SummaryCard areaName={"Exeter"} areaType={"utla"}/>
                <SummaryCard areaName={"Mid Devon"} areaType={"utla"}/>
                <SummaryCard areaName={"South Hams"} areaType={"utla"}/>
                <SummaryCard areaName={"Teignbridge"} areaType={"utla"}/>
                <SummaryCard areaName={"Torridge"} areaType={"utla"}/>
                <SummaryCard areaName={"Torbay"} areaType={"utla"}/>
                <SummaryCard areaName={"West Devon"} areaType={"utla"}/>
                <SummaryCard areaName={"Plymouth"} areaType={"utla"}/>
                <SummaryCard areaName={"North Devon"} areaType={"utla"}/>
            </div>
        </main>
    );
};

export const FavouritesSummaryPage: FunctionComponent = () => {
    return (
        <main className={styles.page}>
            <div className={styles.cardContainer}>
                <SummaryCard areaName={"Islington"} areaType={"utla"}/>
                <SummaryCard areaName={"Kensington and Chelsea"} areaType={"utla"}/>
                <SummaryCard areaName={"Richmond upon Thames"} areaType={"utla"}/>
                <SummaryCard areaName={"Peterborough"} areaType={"utla"}/>
                <SummaryCard areaName={"Wirral"} areaType={"utla"}/>
                <SummaryCard areaName={"Cornwall and Isles of Scilly"} areaType={"utla"}/>
            </div>
        </main>
    );
};
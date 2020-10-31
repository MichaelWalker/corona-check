import React, {FunctionComponent} from "react";
import styles from "./Map.module.scss";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {MapData} from "../../services/mapDataService";

interface MapProps {
    data: MapData;
    hue: number;
}

export const Map: FunctionComponent<MapProps> = ({data, hue}) => {
    const getFill = (code: string): string => {
        if (data[code] === undefined) {
            return "#CCCCCC";
        }
        
        const value = data[code];
        const lightness = 100 - (value! * 100/150);
        
        console.log(`hsl(${hue}, 50, ${lightness})`);
        return `hsl(${hue}, 50%, ${lightness}%)`;
    };
    
    return (
        <section className={styles.card}>
            <ComposableMap
                projection="geoAzimuthalEqualArea"
                width={1000}
                height={1600}
                projectionConfig={{
                    rotate: [3.5, -55.4, 0],
                    scale: 8000
                }}
            >
                <Geographies
                    geography={"/uk-utla.json"}
                    fill="#D6D6DA"
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                >
                    {({ geographies }) =>
                        geographies.map(geo => {
                            return <Geography key={geo.rsmKey} 
                                              geography={geo} 
                                              fill={getFill(geo.properties.code)} 
                                              stroke={"#050d22"} 
                                              strokeWidth={1} 
                            />;
                        })
                    }
                </Geographies>
            </ComposableMap>
        </section>
    );
};
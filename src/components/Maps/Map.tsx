import React, {FunctionComponent} from "react";
import {ComposableMap, Geographies, Geography} from "react-simple-maps";
import {MapData} from "../../services/mapDataService";
import {Card} from "../Card/Card";

interface MapCardProps {
    data: MapData;
    className?: string | undefined;
}

interface MapProps {
    calculateFill: (code: string) => string;
    width: number;
    height: number;
    rotate: [number, number, number];
    scale: number;
}

const Map: FunctionComponent<MapProps> = ({calculateFill, width, height, rotate, scale}) => {
    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            width={width}
            height={height}
            projectionConfig={{
                rotate: rotate,
                scale: scale
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
                                          fill={calculateFill(geo.properties.code)} 
                                          stroke={"#050d22"} 
                                          strokeWidth={1} 
                        />;
                    })
                }
            </Geographies>
        </ComposableMap>
    );
};

export const CaseRateMap: FunctionComponent<MapCardProps> = ({data, className}) => {
    const calculateFill = (code: string): string => {
        if (data[code] === undefined) {
            return "#CCCCCC";
        }

        const value = data[code];
        const lightness = 100 - (value! * 100/150);
        return `hsl(200, 50%, ${lightness}%)`;
    };
    
    return (
        <Card className={className} title={"Cases per 100,000 people"}>
            <Map calculateFill={calculateFill}
                 width={1000}
                 height={1600}
                 rotate={[3.5, -55.4, 0]}
                 scale={8000}
            />
        </Card>
    );
};
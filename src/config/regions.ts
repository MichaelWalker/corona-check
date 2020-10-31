import {AreaType} from "../services/govUkApiClient";

interface RegionConfig {
    name: string;
    type: AreaType;
    subRegions: {
        type: AreaType;
        names: string[];
    }
}

const regions: RegionConfig[] = [
    {
        name: "United Kingdom",
        type: "overview",
        subRegions: {
            type: "nation",
            names: [
                "England", "Wales", "Scotland", "Northern Ireland"
            ]
        }
    }
];

export const getRegionConfig = (areaName: string, areaType: AreaType): RegionConfig | undefined => {
    return regions.find(region => {
        return region.name.toLowerCase() === areaName.toLowerCase() 
            && region.type.toLowerCase === areaType.toLowerCase; 
    });
};

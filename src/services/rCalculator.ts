import {R, TimeSeries} from "./dataStructures";

export const calculateR = (timeSeries: TimeSeries): R => {
    return {
        last7Days: -1,
        last14Days: -1,
        last28Days: -1,
    }
};
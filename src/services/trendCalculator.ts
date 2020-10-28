import {Figure} from "./processingHelpers";

export const get14DayTrend = (values: Figure[]): Figure => {
    const differences: Figure[] = [];
    
    for (let i = 0; i < 7; i++) {
        const thisWeeksData = values[values.length - i];
        const lastWeeksData = values[values.length - (i + 7)];
        
        if (thisWeeksData !== null && lastWeeksData !== null && lastWeeksData > 5) {
            const percentageDifference = 100 * (thisWeeksData - lastWeeksData) / lastWeeksData;
            differences.push(percentageDifference);
        }
    }
    
    return average(differences);
};

const average = (figures: Figure[]): Figure => {
    if (figures.length === 0) {
        return null;
    }
    
    const sum = figures
        .map(figure => figure || 0)
        .reduce((a, b) => a + b);
    return sum / figures.length;
};
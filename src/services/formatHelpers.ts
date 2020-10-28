import moment from "moment";
import {Figure} from "./processingHelpers";

export const formatFigure = (figure: Figure): string => {
    if (figure === null) {
        return "N/A";
    }
    if (figure > 1000000) {
        return `${(figure / 1000000).toPrecision(3)}M`;
    }
    if (figure > 1000) {
        return `${(figure / 1000).toPrecision(3)}k`;
    }
    if (figure < 1 && figure > 0) {
        return `${figure.toFixed(2)}`
    }
    return `${figure.toFixed(0)}`;
};

export const formatDaysAgo = (time: moment.Moment | null): string => {
    if (!time) {
        return "-";
    }
    if (time.isSame(moment(), "day")) {
        return "today";
    }
    if (time.isSame(moment().add(-1, "day"), "day")) {
        return "yesterday";
    }
    return time.fromNow();
};
import React, {FunctionComponent} from "react";
import {ViewerMode} from "../../../config/options";

interface ViewerSettingsProps {
    viewer: ViewerMode;
    setViewer: (viewer: ViewerMode) => void;
}

export const ViewerSettings: FunctionComponent<ViewerSettingsProps> = ({viewer, setViewer}) => {
    return (
        <label>Viewer
            <select value={viewer} onChange={(event) => setViewer(event.target.value as ViewerMode)}>
                <option>Graph</option>
                <option>Table</option>
            </select>
        </label>
    );    
};

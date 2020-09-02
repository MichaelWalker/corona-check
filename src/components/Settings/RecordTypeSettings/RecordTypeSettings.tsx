import React, {FunctionComponent} from "react";
import {RecordType} from "../../../config/options";

interface RecordTypeSettingsProps {
    recordType: RecordType;
    setRecordType: (viewer: RecordType) => void;
}

export const RecordTypeSettings: FunctionComponent<RecordTypeSettingsProps> = ({recordType, setRecordType}) => {
    return (
        <label>Record Type
            <select value={recordType} onChange={(event) => setRecordType(event.target.value as RecordType)}>
                <option>By Publish Date</option>
                <option>By Specimen Date</option>
            </select>
        </label>
    );
};
import React, {FunctionComponent} from "react";
import styles from "./Select.module.scss";

export interface Option {
    label: string;
}

interface SelectProps {
    label: string;
    value: any;
    options: Option[];
    onChange: (selected: any) => void;
}

export const Select: FunctionComponent<SelectProps> = ({label, value, options, onChange}) => {
    return (
        <label>{label}
            <select value={value} onChange={event => onChange(event.target.value)}>
                {options.map(option => <option value={option.label}>{option.label}</option>)}
            </select>
        </label>
    );
};

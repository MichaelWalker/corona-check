import React, {FunctionComponent} from "react";
import styles from "./Select.module.scss";

interface Option {
    label: string;
    value: string;
}

interface SelectProps {
    label: string;
    value: string;
    options: Option[];
    onChange: (selected: string) => void;
}

export const Select: FunctionComponent<SelectProps> = ({label, value, options, onChange}) => {
    return (
        <label>{label}
            <select value={value} onChange={event => onChange(event.target.value)}>
                {options.map(option => <option value={option.value}>{option.label}</option>)}
            </select>
        </label>
    );
};

import React, {FunctionComponent} from "react";
import styles from "./Checkbox.module.scss";

interface CheckboxProps {
    label: string;
    value: boolean;
    onChange: (checked: boolean) => void;
}

export const Checkbox: FunctionComponent<CheckboxProps> = ({label, value, onChange}) => {
    return (
        <label>{label}
            <input type="checkbox" 
                   className={styles.checkbox} 
                   onChange={event => onChange(event.target.checked)} 
                   checked={value}
            />
        </label>
    );
};

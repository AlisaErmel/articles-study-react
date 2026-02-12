import React from "react";
import "./Select.css";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    id: string;
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: SelectOption[];
    required?: boolean;
}

const UISelect: React.FC<SelectProps> = ({
    id,
    label,
    value,
    onChange,
    options,
    required = false,
}) => {
    return (
        <div className="ui-select-wrapper">
            <label htmlFor={id} className="ui-select-label">
                {label}
                {required && (
                    <span aria-hidden="true"> (required)</span>
                )}
            </label>

            <div className="ui-select-container">
                <select
                    id={id}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className="ui-select"
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default UISelect;

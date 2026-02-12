import React from "react";
import './Input.css';

interface InputProps {
    id: string;
    label: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    size?: "small" | "middle" | "large";
}

const UIInput: React.FC<InputProps> = ({ id, label, value, onChange, placeholder, required, size = "large" }) => {
    return (
        <div className="ui-input-wrapper">
            <label htmlFor={id} className="sr-only">
                {label} {required && <span aria-hidden="true">*</span>}
            </label>
            <input
                id={id}
                className={`ui-input ui-input-${size}`}
                type="text"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
            />
        </div>
    );
};

export default UIInput;

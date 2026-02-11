import React from "react";
import './Input.css';

interface InputProps {
    label: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    size?: "small" | "large";
}

const UIInput: React.FC<InputProps> = ({ label, value, onChange, placeholder, required, size = "large" }) => {
    return (
        <div className="ui-input-wrapper">
            <label className="sr-only">
                {label} {required && <span aria-hidden="true">*</span>}
            </label>
            <input
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

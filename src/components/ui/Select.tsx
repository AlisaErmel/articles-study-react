import React, { useState } from "react";
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
    descriptionId?: string;
    required?: boolean;
}

const UISelect: React.FC<SelectProps> = ({
    id,
    label,
    value,
    onChange,
    options,
    descriptionId,
    required = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleMouseDown = () => {
        // Toggle isOpen manually on mouse click
        setIsOpen((prev) => !prev);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
        // Toggle on Enter or Space
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            setIsOpen((prev) => !prev);
        }
    };

    return (
        <div className="ui-select-wrapper">
            <label htmlFor={id} className="ui-select-label">
                {label}
                {required && <span aria-hidden="true"> *</span>}
            </label>

            <div className={`ui-select-container ${isOpen ? "open" : ""}`}>
                <select
                    id={id}
                    value={value}
                    onChange={(e) => {
                        onChange(e);
                        setIsOpen(false); // Close arrow after selection
                    }}
                    onMouseDown={handleMouseDown} // toggle on click
                    onKeyDown={handleKeyDown}
                    onBlur={() => setIsOpen(false)} // close when clicking outside
                    aria-describedby={descriptionId}
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

import React, { useState } from 'react';

interface DropdownProps {
    options: string[];
    label: string;
    value?: string;
    className?: string;
    disabled?: boolean,
    onSelect: (option: string) => void;
}

const BasicDropdown: React.FC<DropdownProps> = ({ options, label, value, className, disabled, onSelect }) => {
    return (
        <div className="relative inline-block w-64">
            <label className="mr-2 text-gray-700 font-bold">{label}</label>
            <select
                disabled={disabled}
                value={value ?? ''}
                onChange={(e) => onSelect(e.target.value)}
                className={`border rounded p-2 ${className}`}
            >
                <option value="" disabled>Select an option</option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BasicDropdown;

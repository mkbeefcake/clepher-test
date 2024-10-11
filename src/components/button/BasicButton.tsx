import React from 'react';

interface BasicButtonProps {
    label: string;                     // Text displayed on the button
    onClick: () => void;               // Function to call on button click
    className?: string;                // Optional class name for additional styling
    disabled?: boolean;                // Optional disabled state
}

const BasicButton: React.FC<BasicButtonProps> = ({ 
    label, 
    onClick, 
    className = '', 
    disabled = false 
}) => {
    return (
        <div>
            <button
                onClick={onClick}
                className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring ${className}`}
                disabled={disabled}
            >
                {label}
            </button>
        </div>
    );
};

export default BasicButton;
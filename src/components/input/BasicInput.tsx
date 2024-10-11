import { FC } from 'react';

type Props = {
    label: string,
    value: string,
    onChange: (e: any) => void;
}

const BasicInput: FC<Props> = ({ label, value, onChange }) => {
    return (
        <div className="mb-4">
            <label className="block font-semibold mb-1">{label}</label>
            <input 
                type="text" 
                value={value} 
                onChange={onChange} 
                className="border border-gray-300 rounded-md p-2 w-full" 
                placeholder={`Enter ${label.toLowerCase()}`} 
            />
        </div>
    );
};

export default BasicInput;
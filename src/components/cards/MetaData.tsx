import { FC } from 'react';
import { ResponseMetaData } from '../../apis/responseTypes';

interface MetaDataCardProps {
    metaData: ResponseMetaData;
}

const MetaDataCard: FC<MetaDataCardProps> = ({ metaData }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Metadata Information</h2>
                <ul className="space-y-2">
                    <li className="flex justify-between">
                        <span className="font-bold">Information:</span>
                        <span>{metaData.Information || ""}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-bold">Symbol:</span>
                        <span>{metaData.Symbol || ""}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-bold">Last Refreshed:</span>
                        <span>{metaData['Last Refreshed'] || ""}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-bold">Interval:</span>
                        <span>{metaData.Interval || ""}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-bold">Output Size:</span>
                        <span>{metaData['Output Size'] || ""}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-bold">Time Zone:</span>
                        <span>{metaData['Time Zone'] || ""}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MetaDataCard;
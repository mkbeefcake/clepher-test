import { FC } from 'react';

interface MetaData {
    information: string;
    symbol: string;
    lastRefreshed: string;
    interval: string;
    outputSize: string;
    timeZone: string;
}

interface MetaDataCardProps {
    metaData: MetaData;
}

const MetaDataCard: FC<MetaDataCardProps> = ({ metaData }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-6">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Metadata Information</h2>
                <ul className="space-y-2">
                    <li className="flex justify-between">
                        <span className="font-medium">Information:</span>
                        <span>{metaData.information}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-medium">Symbol:</span>
                        <span>{metaData.symbol}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-medium">Last Refreshed:</span>
                        <span>{metaData.lastRefreshed}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-medium">Interval:</span>
                        <span>{metaData.interval}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-medium">Output Size:</span>
                        <span>{metaData.outputSize}</span>
                    </li>
                    <li className="flex justify-between">
                        <span className="font-medium">Time Zone:</span>
                        <span>{metaData.timeZone}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default MetaDataCard;
import { FC } from 'react';
import { ResponseMetaData } from '../../apis/responseTypes';
import BasicCard from './BasicCard';

interface MetaDataCardProps {
    metaData: ResponseMetaData;
}

const MetaDataCard: FC<MetaDataCardProps> = ({ metaData }) => {
    return (
        <BasicCard title='MetaData Information'>
            <ul className="space-y-2">
                <li className="flex justify-between">
                    <span className="font-bold">Information:</span>
                    <span>{metaData?.Information || ""}</span>
                </li>
                <li className="flex justify-between">
                    <span className="font-bold">Symbol:</span>
                    <span>{metaData?.Symbol || ""}</span>
                </li>
                <li className="flex justify-between">
                    <span className="font-bold">Last Refreshed:</span>
                    <span>{metaData?.['Last Refreshed'] || ""}</span>
                </li>
                <li className="flex justify-between">
                    <span className="font-bold">Interval:</span>
                    <span>{metaData?.Interval || ""}</span>
                </li>
                <li className="flex justify-between">
                    <span className="font-bold">Output Size:</span>
                    <span>{metaData?.['Output Size'] || ""}</span>
                </li>
                <li className="flex justify-between">
                    <span className="font-bold">Time Zone:</span>
                    <span>{metaData?.['Time Zone'] || ""}</span>
                </li>
            </ul>
        </BasicCard>
    );
};

export default MetaDataCard;
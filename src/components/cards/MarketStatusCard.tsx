import { FC, ReactNode, useState } from "react";
import { ResponseMarketStatusEntry } from "../../apis/responseTypes";

type Props = {
    title: string,
    markets: ResponseMarketStatusEntry[];
}

const MarketStatusCard: FC<Props> = ({ title, markets }) => {

    const [selectedRegion, setSelectedRegion] = useState<string | null>();
    const handleSelectChange = (e:any) => {
        setSelectedRegion(e.target.value)
    }

    const selectedMarket = markets.find(market => market.region === selectedRegion)

    return (
        <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <select
                id="market-select"
                value={selectedRegion || ''}
                onChange={handleSelectChange}
                className="border rounded p-2 mb-4"
            >
                <option value="" disabled>Select a region</option>
                {markets.map((market, index) => (
                    <option key={index} value={market.region}>
                        {market.region}
                    </option>
                ))}
            </select>
            {selectedMarket && (
                <div className="border p-4 rounded">
                    <p>Country: {selectedMarket.region}</p>
                    <p>Market Type: {selectedMarket.market_type}</p>
                    <p>Primary Exchanges: {selectedMarket.primary_exchanges}</p>
                    <p>Local Open: {selectedMarket.local_open}</p>
                    <p>Local Close: {selectedMarket.local_close}</p>
                    <p>Current Status: {selectedMarket.current_status}</p>
                    <p>Notes: {selectedMarket.notes}</p>
                </div>
            )}            
        </div>
    );
};

export default MarketStatusCard;
import useSWR from "swr"
import { apiTimeSeriesIntraDay } from "../apis/api"
import { 
    TimeSeriesIntraDayRequest, 
    createBaseTimeSeriesIntraDayRequest, 
    intervalType
} from "../apis/requestTypes"

import mockData from '../mock/response.json'
import { convertObjToTimeSeriesResponse, ResponseTimeSeriesResponse } from "../apis/responseTypes"
import MetaDataCard from "./cards/MetaData"
import TradeChart from "./cards/TradeChart"
import Loading from "./loading/loading"
import { startTransition, Suspense, useMemo, useState } from "react"
import BasicDropdown from "./dropdowns/BasicDropDown"
import BasicCard from "./cards/BasicCard"
import BasicButton from "./button/BasicButton"

const TimeSeries = () => {

    const [apiType, setApiType ] = useState<string | undefined>();
    const [symbol, setSymbol] = useState<string | undefined>();
    const [interval, setInterval] = useState<string | undefined>();
    const [adjusted, setAdjusted] = useState<string | undefined>();


    const apiTypes = ["IntraDay", "Daily", "DailyAdjusted", "Weekly", "WeeklyAdjusted", "Monthly", "MonthlyAdjusted", "Quote", "Search", "MarketStatus"]
    const apiSymbols = ["IBM"]
    const apiIntervals = ["1min", "5min", "15min", "30min", "60min"]

    const isDisabledSymbol = apiType != 'IntraDay'
    const isDisabledInterval = apiType != 'IntraDay'

    const apiUrl = useMemo(() => {
        console.log(apiType, symbol, interval)

        switch (apiType) {
            case "IntraDay":
                if (!symbol || !interval) {
                    return null
                }

                const intraDayRequest: TimeSeriesIntraDayRequest = {
                    ...createBaseTimeSeriesIntraDayRequest(),
                    symbol: symbol,
                    interval: interval as intervalType,
                }
                return apiTimeSeriesIntraDay(intraDayRequest);
        
            default:
                return null;
        }
    }, [apiType, symbol, interval]);

    const { data, error } = useSWR(apiUrl)
    const response: ResponseTimeSeriesResponse = convertObjToTimeSeriesResponse(data);

    return (
        <div className='flex items-start justify-center h-screen space-x-6'>
            <BasicCard title="TimeSeries API">
                <BasicDropdown 
                    label="Type"
                    options={apiTypes}
                    value={apiType}
                    onSelect={(option) => setApiType(option)}
                />
                <BasicDropdown
                    label="Symbol"
                    disabled={isDisabledSymbol}
                    options={apiSymbols}
                    value={symbol}
                    onSelect={(option) => setSymbol(option)}
                />
                <BasicDropdown 
                    label="Interval"
                    disabled={isDisabledInterval}
                    options={apiIntervals}
                    value={interval}
                    onSelect={(option) => setInterval(option)}
                />
            </BasicCard>
            <Suspense fallback={<Loading/>}>
                {error && (
                    <div>{JSON.stringify(error)}</div>
                )}
                {!error && (
                    <>
                        <MetaDataCard metaData={response["Meta Data"]} />
                        <TradeChart data={response["Time Series"]} />
                    </>
                )}
            </Suspense>
        </div>
    )
}

export default TimeSeries
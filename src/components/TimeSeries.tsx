import { startTransition, Suspense, useMemo, useState } from "react"
import useSWR from "swr"
import { 
    apiTimeSeriesDaily, 
    apiTimeSeriesDailyAdjusted, 
    apiTimeSeriesIntraDay, 
    apiTimeSeriesMarketStatus, 
    apiTimeSeriesMonthly, 
    apiTimeSeriesMonthlyAdjusted, 
    apiTimeSeriesQuote, 
    apiTimeSeriesWeekly,
    apiTimeSeriesWeeklyAdjusted
} from "../apis/api"
import { 
    TimeSeriesDailyAdjustedRequest,
    TimeSeriesDailyRequest,
    TimeSeriesIntraDayRequest, 
    TimeSeriesMarketStatusRequest, 
    TimeSeriesMonthlyAdjustedRequest, 
    TimeSeriesMonthlyRequest, 
    TimeSeriesQuoteRequest, 
    TimeSeriesSearchRequest, 
    TimeSeriesWeeklyAdjustedRequest, 
    TimeSeriesWeeklyRequest, 
    createBaseTimeSeriesDailyAdjustedRequest, 
    createBaseTimeSeriesDailyRequest, 
    createBaseTimeSeriesIntraDayRequest, 
    createBaseTimeSeriesMarketStatusRequest, 
    createBaseTimeSeriesMonthlyAdjustedRequest, 
    createBaseTimeSeriesMonthlyRequest, 
    createBaseTimeSeriesQuoteRequest, 
    createBaseTimeSeriesSearchRequest, 
    createBaseTimeSeriesWeeklyAdjustedRequest, 
    createBaseTimeSeriesWeeklyRequest, 
    intervalType
} from "../apis/requestTypes"

import mockData from '../mock/response.json'
import { 
    convertObjToTimeSeriesResponse, 
    ResponseTimeSeriesResponse 
} from "../apis/responseTypes"
import MetaDataCard from "./cards/MetaData"
import TradeChart from "./cards/TradeChart"
import Loading from "./loading/loading"
import BasicDropdown from "./dropdowns/BasicDropDown"
import BasicCard from "./cards/BasicCard"
import BasicButton from "./button/BasicButton"

const TimeSeries = () => {

    const [apiUrl, setApiUrl] = useState<string | null>();
    const [apiType, setApiType ] = useState<string | undefined>();
    const [symbol, setSymbol] = useState<string | undefined>();
    const [interval, setInterval] = useState<string | undefined>();

    const apiTypes = ["IntraDay", "Daily", "DailyAdjusted", "Weekly", "WeeklyAdjusted", "Monthly", "MonthlyAdjusted", "Quote", "MarketStatus"]
    const apiSymbols = ["IBM"]
    const apiIntervals = ["1min", "5min", "15min", "30min", "60min"]

    const isDisabledSymbol = apiType == 'MarketStatus'
    const isDisabledInterval = apiType != 'IntraDay'

    const onHandleGet = () => {
        switch (apiType) {
            case "IntraDay":
                if (!symbol || !interval) {
                    alert("Please correct symbol or interval fields")
                    return
                }

                const intraDayRequest: TimeSeriesIntraDayRequest = {
                    ...createBaseTimeSeriesIntraDayRequest(),
                    symbol: symbol,
                    interval: interval as intervalType,
                }
                startTransition(() => setApiUrl(apiTimeSeriesIntraDay(intraDayRequest)));
                break;
        
            case "Daily":
                if (!symbol) {
                    alert("Please correct symbol field")
                    return
                }

                const dailyRequest: TimeSeriesDailyRequest = {
                    ...createBaseTimeSeriesDailyRequest(),
                    symbol: symbol
                }
                startTransition(() => setApiUrl(apiTimeSeriesDaily(dailyRequest)));
                break;

            case "DailyAdjusted":
                if (!symbol) {
                    alert("Please correct symbol field")
                    return
                }

                const dailyAdjustedRequest: TimeSeriesDailyAdjustedRequest = {
                    ...createBaseTimeSeriesDailyAdjustedRequest(),
                    symbol: symbol
                }
                startTransition(() => setApiUrl(apiTimeSeriesDailyAdjusted(dailyAdjustedRequest)));
                break;

            case "Weekly":
                if (!symbol) {
                    alert("Please correct symbol field")
                    return                    
                }

                const weeklyRequest: TimeSeriesWeeklyRequest = {
                    ...createBaseTimeSeriesWeeklyRequest(),
                    symbol: symbol
                }
                startTransition(() => setApiUrl(apiTimeSeriesWeekly(weeklyRequest)));
                break;

            case "WeeklyAdjusted":
                if (!symbol) {
                    alert("Please correct symbol field")
                    return
                }

                const weeklyAdjustedRequest: TimeSeriesWeeklyAdjustedRequest = {
                    ...createBaseTimeSeriesWeeklyAdjustedRequest(),
                    symbol: symbol
                }
                startTransition(() => setApiUrl(apiTimeSeriesWeeklyAdjusted(weeklyAdjustedRequest)));
                break;

            case "Monthly":
                if (!symbol) {
                    alert("Please correct symbol field")
                    return
                }

                const monthlyRequest: TimeSeriesMonthlyRequest = {
                    ...createBaseTimeSeriesMonthlyRequest(),
                    symbol: symbol
                }
                startTransition(() => setApiUrl(apiTimeSeriesMonthly(monthlyRequest)));
                break;

            case "MonthlyAdjusted":
                if (!symbol) {
                    alert("Please correct symbol field")
                    return
                }

                const monthlyAdjustedRequest: TimeSeriesMonthlyAdjustedRequest = {
                    ...createBaseTimeSeriesMonthlyAdjustedRequest(),
                    symbol: symbol
                }
                startTransition(() => setApiUrl(apiTimeSeriesMonthlyAdjusted(monthlyAdjustedRequest)));
                break;

            case "Quote":
                if (!symbol) {
                    alert("Please correct symbol field")
                    return
                }

                const quoteRequest: TimeSeriesQuoteRequest = {
                    ...createBaseTimeSeriesQuoteRequest(),
                    symbol: symbol
                }
                startTransition(() => setApiUrl(apiTimeSeriesQuote(quoteRequest)));
                break;

            case "MarketStatus":
                const marketRequest: TimeSeriesMarketStatusRequest = {
                    ...createBaseTimeSeriesMarketStatusRequest(),                    
                }
                startTransition(() => setApiUrl(apiTimeSeriesMarketStatus(marketRequest)));
                break;

            default:
                return;
        }
    };

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
                <BasicButton
                    label="Get"
                    onClick={onHandleGet}
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
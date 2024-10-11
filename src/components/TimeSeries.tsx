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

import mockData1 from '../mock/response1.json'
import mockData2 from '../mock/response2.json'
import { 
    convertObjToTimeSeriesResponse, 
    ResponseErrorResponse, 
    ResponseMarketStatusResponse, 
    ResponseTimeSeriesResponse 
} from "../apis/responseTypes"
import MetaDataCard from "./cards/MetaData"
import TradeChart from "./cards/TradeChart"
import Loading from "./loading/loading"
import BasicDropdown from "./dropdowns/BasicDropDown"
import BasicCard from "./cards/BasicCard"
import BasicButton from "./button/BasicButton"
import MarketStatusCard from "./cards/MarketStatusCard"

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

    const { data } = useSWR(apiUrl)
    const response: ResponseTimeSeriesResponse | ResponseErrorResponse | ResponseMarketStatusResponse 
        = convertObjToTimeSeriesResponse(data);

    console.log(data)

    const isTimeSeries = (obj:any): obj is ResponseTimeSeriesResponse => "Meta Data" in response && "Time Series" in response
    const isMarketStatus = (obj:any): obj is ResponseMarketStatusResponse => "endpoint" in response && "markets" in response
    const isErrorResponse = (obj:any): obj is ResponseErrorResponse => "Information" in response

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
                {isTimeSeries(response) && (
                    <>
                        <MetaDataCard metaData={response["Meta Data"]} />
                        <TradeChart data={response["Time Series"]} />
                    </>
                )}
                {isMarketStatus(response) && (
                    <MarketStatusCard title={response.endpoint} markets={response.markets} />
                )}
                {isErrorResponse(response) && (
                    <BasicCard title="Error Response">
                        <div>{response["Information"]}</div>
                    </BasicCard>
                )}
            </Suspense>
        </div>
    )
}

export default TimeSeries
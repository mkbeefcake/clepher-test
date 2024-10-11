import useSWR from "swr"
import { apiTimeSeriesIntraDay } from "../apis/api"
import { 
    TimeSeriesIntraDayRequest, 
    createBaseTimeSeriesIntraDayRequest 
} from "../apis/requestTypes"

import mockData from '../mock/response.json'
import { convertObjToTimeSeriesResponse, ResponseTimeSeriesResponse } from "../apis/responseTypes"
import MetaDataCard from "./cards/MetaData"
import TradeChart from "./cards/TradeChart"
import Loading from "./loading/loading"
import { Suspense } from "react"

const TimeSeries = () => {
    const intraDayRequest: TimeSeriesIntraDayRequest = {
        ...createBaseTimeSeriesIntraDayRequest(),
        symbol: "IBM",
        interval: "5min",
    }
    // const { data } = useSWR(apiTimeSeriesIntraDay(intraDayRequest))    
    const response: ResponseTimeSeriesResponse = convertObjToTimeSeriesResponse(mockData);

    return (
        <div className='flex items-center justify-center h-screen'>
            <Suspense fallback={<Loading/>}>
                <MetaDataCard metaData={response["Meta Data"]} />
                <TradeChart data={response["Time Series"]} />
            </Suspense>
        </div>
    )
}

export default TimeSeries
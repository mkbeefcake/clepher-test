import useSWR from "swr"
import { apiTimeSeriesIntraDay } from "../apis/api"
import { 
    TimeSeriesIntraDayRequest, 
    createBaseTimeSeriesIntraDayRequest 
} from "../apis/requestTypes"

import mockData from '../mock/response.json'
import { convertObjToTimeSeriesResponse, ResponseTimeSeriesResponse } from "../apis/responseTypes"
import MetaDataCard from "./cards/MetaData"

const TimeSeries = () => {
    const intraDayRequest: TimeSeriesIntraDayRequest = {
        ...createBaseTimeSeriesIntraDayRequest(),
        symbol: "IBM",
        interval: "5min",
    }
    const { data } = useSWR(apiTimeSeriesIntraDay(intraDayRequest))    
    const response: ResponseTimeSeriesResponse = convertObjToTimeSeriesResponse(mockData);

    return (
        <div className='flex items-center justify-center h-screen'>
            <MetaDataCard metaData={{
                information: response["Meta Data"].Information || "",
                interval: response["Meta Data"].Interval || "",
                lastRefreshed: response["Meta Data"]["Last Refreshed"] || "",
                outputSize: response["Meta Data"]["Output Size"] || "",
                symbol: response["Meta Data"].Symbol || "",
                timeZone: response["Meta Data"]["Time Zone"] || ""
            }} />
            {/* <h1 className='text-xs font-bold text-blue-500'>{JSON.stringify(mockData["Meta Data"])}</h1> */}
        </div>
    )
}

export default TimeSeries
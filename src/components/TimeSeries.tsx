import useSWR from "swr"
import { apiTimeSeriesIntraDay } from "../apis/api"
import { 
    TimeSeriesIntraDayRequest, 
    createBaseTimeSeriesIntraDayRequest 
} from "../apis/requestTypes"

import mockData from '../mock/response.json'
import { convertObjToTimeSeriesResponse, ResponseTimeSeriesResponse } from "../apis/responseTypes"

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
            <h1 className='text-xs font-bold text-blue-500'>{JSON.stringify(response["Meta Data"])}</h1>
            {/* <h1 className='text-xs font-bold text-blue-500'>{JSON.stringify(mockData["Meta Data"])}</h1> */}
        </div>
    )
}

export default TimeSeries
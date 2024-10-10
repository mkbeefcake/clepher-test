
import { buildQueryString } from "./utils";
import { 
    BaseRequest,
    TimeSeriesDailyRequest, 
    TimeSeriesIntraDayRequest, 
    TimeSeriesDailyAdjustedRequest, 
    TimeSeriesWeeklyRequest, 
    TimeSeriesWeeklyAdjustedRequest, 
    TimeSeriesMonthlyRequest, 
    TimeSeriesMonthlyAdjustedRequest, 
    TimeSeriesQuoteRequest, 
    TimeSeriesSearchRequest, 
    TimeSeriesMarketStatusRequest 
} from "./requestTypes";

const BASE_URL="https://www.alphavantage.co/query"

// Generic API function
const apiCall = <T extends BaseRequest>(obj: T): string => {
    return buildQueryString(BASE_URL, obj);
}

export const apiTimeSeriesIntraDay = (obj: TimeSeriesIntraDayRequest): string => apiCall(obj)
export const apiTimeSeriesDaily = (obj: TimeSeriesDailyRequest): string => apiCall(obj)
export const apiTimeSeriesDailyAdjusted = (obj: TimeSeriesDailyAdjustedRequest): string => apiCall(obj)
export const apiTimeSeriesWeekly = (obj: TimeSeriesWeeklyRequest): string => apiCall(obj)
export const apiTimeSeriesWeeklyAdjusted = (obj: TimeSeriesWeeklyAdjustedRequest): string => apiCall(obj)
export const apiTimeSeriesMonthly = (obj: TimeSeriesMonthlyRequest): string => apiCall(obj)
export const apiTimeSeriesMonthlyAdjusted = (obj: TimeSeriesMonthlyAdjustedRequest): string => apiCall(obj)
export const apiTimeSeriesQuote = (obj: TimeSeriesQuoteRequest): string => apiCall(obj)
export const apiTimeSeriesSearch = (obj: TimeSeriesSearchRequest): string => apiCall(obj)
export const apiTimeSeriesMarketStatus = (obj: TimeSeriesMarketStatusRequest): string => apiCall(obj)


export interface BaseRequest {
    function: string;      
    apikey: string;        
    datatype?: "json" | "csv";
}

const createBaseRequest = (apiKey?: string) => {
    return {
        apikey: apiKey ? apiKey : process.env.REACT_APP_ALPHA_VANTAGE_KEY || "",
        datatype: "json" as "json"
    }
}

interface TimeSeriesBaseRequest extends BaseRequest {
    symbol: string;
}

export type intervalType = "1min" | "5min" | "15min" | "30min" | "60min";
export type outputSizeType = "compact" | "full";

export interface TimeSeriesIntraDayRequest extends TimeSeriesBaseRequest {    
    interval: intervalType; 
    adjusted?: boolean;
    extended_hours?: boolean;
    month?: string; 
    outputsize?: outputSizeType; 
}

export const createBaseTimeSeriesIntraDayRequest = (apiKey?: string) => {
    return { 
        ...createBaseRequest(apiKey),
        function: "TIME_SERIES_INTRADAY"
    }
}

export interface TimeSeriesDailyRequest extends TimeSeriesBaseRequest {
    outputsize?: outputSizeType; 
}

export const createBaseTimeSeriesDailyRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "TIME_SERIES_DAILY"
    }
}

export interface TimeSeriesDailyAdjustedRequest extends TimeSeriesBaseRequest {
    outputsize?: outputSizeType; 
}

export const createBaseTimeSeriesDailyAdjustedRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "TIME_SERIES_DAILY_ADJUSTED"
    }
}

export interface TimeSeriesWeeklyRequest extends TimeSeriesBaseRequest {    

}

export const createBaseTimeSeriesWeeklyRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "TIME_SERIES_WEEKLY"
    }
}

export interface TimeSeriesWeeklyAdjustedRequest extends TimeSeriesBaseRequest {

}

export const createBaseTimeSeriesWeeklyAdjustedRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "TIME_SERIES_WEEKLY_ADJUSTED"
    }
}

export interface TimeSeriesMonthlyRequest extends TimeSeriesBaseRequest {
    
}

export const createBaseTimeSeriesMonthlyRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "TIME_SERIES_MONTHLY"
    }
}

export interface TimeSeriesMonthlyAdjustedRequest extends TimeSeriesBaseRequest {
    
}

export const createBaseTimeSeriesMonthlyAdjustedRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "TIME_SERIES_MONTHLY_ADJUSTED"
    }
}

export interface TimeSeriesQuoteRequest extends TimeSeriesBaseRequest {
    
}

export const createBaseTimeSeriesQuoteRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "GLOBAL_QUOTE"
    }
}

export interface TimeSeriesSearchRequest extends TimeSeriesBaseRequest {
    keywords: string
}

export const createBaseTimeSeriesSearchRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "SYMBOL_SEARCH"
    }
}

export interface TimeSeriesMarketStatusRequest extends BaseRequest {
    
}

export const createBaseTimeSeriesMarketStatusRequest = (apiKey?: string) => {
    return {
        ...createBaseRequest(apiKey),
        function: "MARKET_STATUS"
    }
}


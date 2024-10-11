
export interface BaseRequest {
    function: string;      
    apikey: string;        
    datatype?: "json" | "csv";
}

const createBaseRequest = () => {
    return {
        apikey: process.env.REACT_APP_ALPHA_VANTAGE_KEY || "",
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

export const createBaseTimeSeriesIntraDayRequest = () => {
    return { 
        ...createBaseRequest(),
        function: "TIME_SERIES_INTRADAY"
    }
}

export interface TimeSeriesDailyRequest extends TimeSeriesBaseRequest {
    outputsize?: outputSizeType; 
}

export const createBaseTimeSeriesDailyRequest = () => {
    return {
        ...createBaseRequest(),
        function: "TIME_SERIES_DAILY"
    }
}

export interface TimeSeriesDailyAdjustedRequest extends TimeSeriesBaseRequest {
    outputsize?: outputSizeType; 
}

export const createBaseTimeSeriesDailyAdjustedRequest = () => {
    return {
        ...createBaseRequest(),
        function: "TIME_SERIES_DAILY_ADJUSTED"
    }
}

export interface TimeSeriesWeeklyRequest extends TimeSeriesBaseRequest {    

}

export const createBaseTimeSeriesWeeklyRequest = () => {
    return {
        ...createBaseRequest(),
        function: "TIME_SERIES_WEEKLY"
    }
}

export interface TimeSeriesWeeklyAdjustedRequest extends TimeSeriesBaseRequest {

}

export const createBaseTimeSeriesWeeklyAdjustedRequest = () => {
    return {
        ...createBaseRequest(),
        function: "TIME_SERIES_WEEKLY_ADJUSTED"
    }
}

export interface TimeSeriesMonthlyRequest extends TimeSeriesBaseRequest {
    
}

export const createBaseTimeSeriesMonthlyRequest = () => {
    return {
        ...createBaseRequest(),
        function: "TIME_SERIES_MONTHLY"
    }
}

export interface TimeSeriesMonthlyAdjustedRequest extends TimeSeriesBaseRequest {
    
}

export const createBaseTimeSeriesMonthlyAdjustedRequest = () => {
    return {
        ...createBaseRequest(),
        function: "TIME_SERIES_MONTHLY_ADJUSTED"
    }
}

export interface TimeSeriesQuoteRequest extends TimeSeriesBaseRequest {
    
}

export const createBaseTimeSeriesQuoteRequest = () => {
    return {
        ...createBaseRequest(),
        function: "GLOBAL_QUOTE"
    }
}

export interface TimeSeriesSearchRequest extends TimeSeriesBaseRequest {
    keywords: string
}

export const createBaseTimeSeriesSearchRequest = () => {
    return {
        ...createBaseRequest(),
        function: "SYMBOL_SEARCH"
    }
}

export interface TimeSeriesMarketStatusRequest extends BaseRequest {
    
}

export const createBaseTimeSeriesMarketStatusRequest = () => {
    return {
        ...createBaseRequest(),
        function: "MARKET_STATUS"
    }
}


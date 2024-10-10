
interface BaseAVRequest {
    function: string;      
    apikey: string;        
    datatype?: "json" | "csv";
}

interface TimeSeriesBaseRequest extends BaseAVRequest {
    symbol: string;
}

export interface TimeSeriesIntraDayRequest extends TimeSeriesBaseRequest {
    function: "TIME_SERIES_INTRADAY";
    interval: "1min" | "5min" | "15min" | "30min" | "60min"; 
    adjusted?: boolean;
    extended_hours?: boolean;
    month?: string; 
    outputsize?: "compact" | "full"; 
}

export interface TimeSeriesDailyRequest extends TimeSeriesBaseRequest {
    function: "TIME_SERIES_DAILY";
    outputsize?: "compact" | "full"; 
}

export interface TimeSeriesDailyAdjustedRequest extends TimeSeriesBaseRequest {
    function: "TIME_SERIES_DAILY_ADJUSTED";
    outputsize?: "compact" | "full"; 
}

export interface TimeSeriesWeeklyRequest extends TimeSeriesBaseRequest {
    function: "TIME_SERIES_WEEKLY";
}

export interface TimeSeriesWeeklyAdjustedRequest extends TimeSeriesBaseRequest {
    function: "TIME_SERIES_WEEKLY_ADJUSTED";
}

export interface TimeSeriesMonthlyRequest extends TimeSeriesBaseRequest {
    function: "TIME_SERIES_MONTHLY";
}

export interface TimeSeriesMonthlyAdjustedRequest extends TimeSeriesBaseRequest {
    function: "TIME_SERIES_MONTHLY_ADJUSTED";
}

export interface TimeSeriesQuoteRequest extends TimeSeriesBaseRequest {
    function: "GLOBAL_QUOTE";
}

export interface TimeSeriesSearchRequest extends TimeSeriesBaseRequest {
    function: "SYMBOL_SEARCH";
}

export interface TimeSeriesMarketStatusRequest extends TimeSeriesBaseRequest {
    function: "MARKET_STATUS";
}


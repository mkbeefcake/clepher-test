import { removeNumericPrefixes } from "./utils";

export interface ResponseMetaData {
    "Information"?: string;
    "Symbol"?: string;
    "Last Refreshed"?: string; 
    "Interval"?: string; 
    "Output Size"?: string; 
    "Time Zone"?: string; 
}
const convertObjToMetaData = (obj:any): ResponseMetaData => removeNumericPrefixes(obj)

export interface ResponseTimeSeriesEntry {
    "open": string;
    "high": string; 
    "low": string; 
    "close": string; 
    "volume": string; 
}
const convertObjToTimeSeriesEntry = (obj:any): ResponseTimeSeriesEntry => removeNumericPrefixes(obj)

export interface ResponseTimeSeries {
    [timestamp: string]: ResponseTimeSeriesEntry; 
}
const convertObjToTimeSeries = (obj: any): ResponseTimeSeries => {
    let newData: any = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const value = obj[key];
            if (value === undefined) {
                continue; // Skip undefined values
            }
            
            newData[key] = convertObjToTimeSeriesEntry(value); 
        }
    }
    return newData

}

// Time Series default response
export interface ResponseTimeSeriesResponse {
    "Meta Data": ResponseMetaData;
    "Time Series": ResponseTimeSeries; 
}

// Market Status response
export interface ResponseMarketStatusEntry {
    market_type: string;
    region: string;
    primary_exchanges: string;
    local_open: string;
    local_close: string;
    current_status: string;
    notes: string;
}
const convertObjToMarketStatusEntry = (obj:any): ResponseMarketStatusEntry => removeNumericPrefixes(obj)
const convertObjToMarketStatusEntries = (arr:any): ResponseMarketStatusEntry[] => arr.map(convertObjToMarketStatusEntry)

export interface ResponseMarketStatusResponse {
    endpoint: string;
    markets: ResponseMarketStatusEntry[];
}

// Error Response
export interface ResponseErrorResponse {
    "Information": string;
}

export const convertObjToTimeSeriesResponse = (obj: any): ResponseTimeSeriesResponse | ResponseErrorResponse | ResponseMarketStatusResponse => {
    let newData: Partial<ResponseTimeSeriesResponse> & 
                 Partial<ResponseErrorResponse> & 
                 Partial<ResponseMarketStatusResponse> = {};
    for (const key in obj) {
        if (key === "Meta Data") {
            newData["Meta Data"] = convertObjToMetaData(obj[key])
        }
        else if (key.includes("Time Series")) {
            newData["Time Series"] = convertObjToTimeSeries(obj[key])
        }
        else if (key.includes("Information")) {
            newData["Information"] = String(obj[key])
        }
        else if (key.includes("endpoint")) {
            newData.endpoint = String(obj[key])
        }
        else if (key.includes("markets")) {
            newData.markets = convertObjToMarketStatusEntries(obj[key])
        }
    }

    // Type guard
    if ("Meta Data" in newData && "Time Series" in newData) {
        return newData as ResponseTimeSeriesResponse;
    }

    if ("endpoint" in newData && "markets" in newData) {
        return newData as ResponseMarketStatusResponse;
    }

    if ("Information" in newData) {
        return newData as ResponseErrorResponse;
    }

    return { "Information" : "Invalid Response format"};
}


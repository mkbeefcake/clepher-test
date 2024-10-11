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

export interface ResponseTimeSeriesResponse {
    "Meta Data": ResponseMetaData;
    "Time Series": ResponseTimeSeries; 
}

export const convertObjToTimeSeriesResponse = (obj: any): ResponseTimeSeriesResponse | undefined => {
    let newData: any = {};
    for (const key in obj) {
        if (key === "Meta Data") {
            newData["Meta Data"] = convertObjToMetaData(obj[key])
        }
        else if (key.includes("Time Series")) {
            newData["Time Series"] = convertObjToTimeSeries(obj[key])
        }
    }

    if (!newData["Meta Data"] || !newData["Time Series"])
        return undefined;

    return newData;
}


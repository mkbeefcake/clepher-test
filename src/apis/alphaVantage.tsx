
const BASE_URL="https://www.alphavantage.co/query"
const apiKey = process.env.REACT_APP_API_KEY;

export const INTRADAY_API_ENDPOINT = (symbol: string, interval: number): string => {
    return `${BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}min&apikey=${apiKey}`
}


import useSWR from "swr"
import { INTRADAY_API_ENDPOINT } from "../apis/alphaVantage"
import TimeSeries from "./TimeSeries"

const Main = () => {

    return (
        <div className='flex flex-wrap justify-around items-center p-4'>
            <TimeSeries/>
        </div>
    )
}

export default Main
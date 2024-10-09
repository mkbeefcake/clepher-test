import useSWR from "swr"
import { INTRADAY_API_ENDPOINT } from "../apis/alphaVantage"
import IntraDay from "./IntraDay"

const Main = () => {

    return (
        <div className='flex flex-wrap justify-around items-center p-4'>
            <IntraDay/>
            <IntraDay/>
        </div>
    )
}

export default Main
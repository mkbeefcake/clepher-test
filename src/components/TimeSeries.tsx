import useSWR from "swr"
import { INTRADAY_API_ENDPOINT } from "../apis/alphaVantage"



const IntraDay = () => {

    const { data } = useSWR(INTRADAY_API_ENDPOINT("IBM", 5))
    console.log(data)

    return (
        <div className='flex items-center justify-center h-screen'>
            <h1 className='text-xs font-bold text-blue-500'>{JSON.stringify(data)}</h1>
        </div>
    )
}

export default IntraDay
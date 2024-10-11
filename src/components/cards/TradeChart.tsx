import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

import { ResponseTimeSeries } from '../../apis/responseTypes';

interface TradeChartProps {
    data: ResponseTimeSeries;
}

const TradeChart: React.FC<TradeChartProps> = ({ data }) => {
    const chartData = data ? Object.entries(data).map(([date, values]) => ({
        date,
        open: parseFloat(values.open),
        high: parseFloat(values.high),
        low: parseFloat(values.low),
        close: parseFloat(values.close),
        volume: parseInt(values.volume),
    })).slice(-15) : [];

    const minValue = chartData.reduce(
        (minValue, { open, low, close }) => {
            const currentMin = Math.min(low, open, close);
            return currentMin < minValue ? currentMin : minValue == 0 ? currentMin : minValue;
        },
        0,
    );
    const maxValue = chartData.reduce(
        (maxValue, { open, high, close }) => {
            const currentMax = Math.max(high, open, close);
            return currentMax > maxValue ? currentMax : maxValue;
        },
        minValue,
    );
    
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date"/>
                <YAxis domain={[minValue, maxValue]} />
                <Tooltip />
                <Legend />
                <Line dataKey="open" stroke="#82ca9d" name="Open" />
                <Line dataKey="close" stroke="#ff7300" name="Close" />
                <Line dataKey="low" stroke="#ff0000" name="Low" />
                <Line dataKey="high" stroke="#8884d8" name="High" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default TradeChart;

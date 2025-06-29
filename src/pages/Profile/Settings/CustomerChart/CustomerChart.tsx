import { Flex } from '@chakra-ui/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { LikesBookmarksI } from '~/interfaces/bloggerI';

export interface CustomerChartProps {
    data: LikesBookmarksI[];
    color: string;
}

export function CustomerChart({ data, color }: CustomerChartProps) {
    return (
        <Flex w='100%' overflowX='auto'>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray='2 2' />
                    <XAxis dataKey='date' />
                    <YAxis ticks={[0, 20, 40, 60, 80, 100, 120]} />
                    <Line type='monotone' dataKey='count' stroke={color} />
                </LineChart>
            </ResponsiveContainer>
        </Flex>
    );
}

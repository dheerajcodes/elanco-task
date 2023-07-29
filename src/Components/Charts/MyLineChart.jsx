import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box } from '@chakra-ui/react';

const MyLineChart = ({ data, dataKey }) => {
  return (
    <Box bg="white" p={4} mb={8}>
      <LineChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataKey} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="ConsumedQuantity" name="Consumed Quantity" stroke="#8884d8" />
      </LineChart>
    </Box>
  );
};

export default MyLineChart;

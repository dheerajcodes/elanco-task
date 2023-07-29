import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Box } from '@chakra-ui/react';

const MyBarChart = ({ data }) => {
  return (
    <Box bg="white" p={4} mb={8}>
      <BarChart width={800} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Cost" name="Cost" fill="#82ca9d" />
      </BarChart>
    </Box>
  );
};

export default MyBarChart;

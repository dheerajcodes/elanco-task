import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    Divider,
    SimpleGrid,
} from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const HomePage = () => {
    const [applications, setApplications] = useState([]);
    const [resources, setResources] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mostUsedResource, setMostUsedResource] = useState({ name: '', count: 0 });

    useEffect(() => {
        axios.all([
            axios.get('https://engineering-task.elancoapps.com/api/applications'),
            axios.get('https://engineering-task.elancoapps.com/api/resources'),
            axios.get('https://engineering-task.elancoapps.com/api/raw'),
        ])
        .then(axios.spread((applicationsResponse, resourcesResponse, rawDataResponse) => {
            setApplications(applicationsResponse.data);
            setResources(resourcesResponse.data);
            setRawData(rawDataResponse.data);
            setLoading(false);
            findMostUsedResource(rawDataResponse.data);
        }))
        .catch((error) => {
            console.error('Error fetching data:', error.message);
            setLoading(false);
        });
    }, []);

    const findMostUsedResource = (data) => {
        const resourceCounts = {};
        data.forEach(item => {
            if (resourceCounts[item.ServiceName]) {
                resourceCounts[item.ServiceName]++;
            } else {
                resourceCounts[item.ServiceName] = 1;
            }
        });

        let maxCount = 0;
        let mostUsedResourceName = '';

        for (const resourceName in resourceCounts) {
            if (resourceCounts[resourceName] > maxCount) {
                maxCount = resourceCounts[resourceName];
                mostUsedResourceName = resourceName;
            }
        }

        setMostUsedResource({ name: mostUsedResourceName, count: maxCount });
    };


    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${month}/${day}/${year}`);
    };

    // Prepare data for LineChart
    const chartData = rawData.map((item) => ({
        date: parseDate(item.Date),
        consumedQuantity: parseInt(item.ConsumedQuantity),
    }));

    const totalConsumedQuantity = rawData.reduce((total, item) => total + parseInt(item.ConsumedQuantity), 0);
    const totalCost = rawData.reduce((total, item) => total + parseFloat(item.Cost), 0);

    const uniqueLocations = [...new Set(rawData.map(item => item.Location))];
    const pieChartData = uniqueLocations.map((location, index) => ({
        name: location,
        value: rawData.filter(item => item.Location === location).reduce((sum, item) => sum + parseInt(item.ConsumedQuantity), 0),
        fill: ['#805AD5', '#8884d8', '#a48ae3', '#b197fc', '#c6a7ff'][index % 5]
    }));

    return (
        <Box p={8} pb={10}>
            <Heading as="h1" size="xl" mb={4} color="purple.600">
                Welcome to Your Resource Management Dashboard
            </Heading>

            <Divider my={6} />

            <Stack spacing={6}>
                <Heading as="h2" size="lg" color="purple.500">
                    Overview
                </Heading>

                <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={6}>
                    <Stat>
                        <StatLabel color="purple.400">Total Applications</StatLabel>
                        <StatNumber>{applications.length}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color="purple.400">Total Resources</StatLabel>
                        <StatNumber>{resources.length}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color="purple.400">Total Consumed Quantity</StatLabel>
                        <StatNumber>{totalConsumedQuantity}</StatNumber>
                    </Stat>
                    <Stat>
                        <StatLabel color="purple.400">Total Cost</StatLabel>
                        <StatNumber>{totalCost}</StatNumber>
                    </Stat>
                </SimpleGrid>

                <Divider my={6} />

                <Heading as="h2" size="lg" color="purple.500">
                    Resource Consumption Over Time
                </Heading>

                {/* Replace the placeholder chart with your actual LineChart */}
                <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                    <LineChart width={800} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="consumedQuantity" name="Consumed Quantity" stroke="#8884d8" />
                    </LineChart>
                </Box>

                <Divider my={6} />

                <Heading as="h2" size="lg" color="purple.500">
                    Resource Consumption by Location
                </Heading>

                <Box bg="white" p={4} borderRadius="md" boxShadow="md">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ cx, cy, midAngle, innerRadius, outerRadius, value, index }) => {
                                const RADIAN = Math.PI / 180;
                                const radius = 40 + innerRadius + (outerRadius - innerRadius);
                                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                return (
                                    <text
                                        x={x}
                                        y={y}
                                        fill={pieChartData[index].fill}
                                        textAnchor={x > cx ? 'start' : 'end'}
                                        dominantBaseline="central"
                                    >
                                        {pieChartData[index].name}
                                    </text>
                                );
                            }}
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </Box>

                <Divider my={6} />
            </Stack>
        </Box>
    );
};

export default HomePage;

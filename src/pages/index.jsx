import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Stack,
    Divider,
    SimpleGrid,
    Text
} from '@chakra-ui/react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../Components/StatsCard';
import ResponsiveGrid from '../Components/ResponsiveGrid';
import ResourceItemCard from '../Components/ResourceItemCard';

const HomePage = () => {
    const [applications, setApplications] = useState([]);
    const [resources, setResources] = useState([]);
    const [rawData, setRawData] = useState([]);
    const [loading, setLoading] = useState(true);

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
            }))
            .catch((error) => {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            });
    }, []);


    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('/');
        return new Date(`${month}/${day}/${year}`);
    };

    // Prepare data for LineChart
    const chartData = rawData.map((item) => ({
        date: parseDate(item.Date),
        consumedQuantity: parseInt(item.ConsumedQuantity),
    }));

    const uniqueLocations = [...new Set(rawData.map(item => item.Location))];


    const pieChartData = uniqueLocations.map((location, index) => ({
        name: location,
        value: rawData.filter(item => item.Location === location).reduce((sum, item) => sum + parseInt(item.ConsumedQuantity), 0),
        fill: ['#805AD5', '#8884d8', '#a48ae3', '#b197fc', '#c6a7ff'][index % 5]
    }));

    const totalCost = rawData.reduce((total, item) => total + parseFloat(item.Cost), 0)//.toFixed(2);

    const mostUsedResource = pieChartData.reduce((maxResource, currentResource) => {
        return currentResource.value > maxResource.value ? currentResource : maxResource;
    }, pieChartData[0]);

    // Identify the top applications based on consumed quantity
    const topApplications = applications.sort((a, b) => b.ConsumedQuantity - a.ConsumedQuantity).slice(0, 5);

    console.log('top', topApplications);



    return (
        <Box p={8} pb={10}>
            <Heading as="h1" size="xl" mb={4} color="purple.600">
                Elanco Cloud Insights
            </Heading>

            <Divider my={6} />

            <Stack spacing={6}>
                <Heading as="h2" size="xl" color="purple.700">
                    Overview
                </Heading>

                <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={6}>
                    <StatCard label="Total Applications" value={applications.length} />
                    <StatCard label="Total Resources" value={resources.length} />
                    {/* <StatCard label="Total Consumed Quantity" value={totalConsumedQuantity} /> */}
                    <StatCard label="Total Cost" value={totalCost.toFixed(2)} /> {/* Round totalCost to 2 decimal places */}
                </SimpleGrid>

                <Divider my={6} />

                <Stack spacing={6}>
                    {/* Render the MostUsedResourceCard with the most used resource */}
                    <MostUsedResourceCard resource={mostUsedResource} />

                    {/* Existing code... */}
                </Stack>

                <Divider my={6} />

                <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
                    <Heading as="h2" size="lg" color="purple.500" mb={4}>
                        Top Applications Using Resources
                    </Heading>

                    <ResponsiveGrid>
                        {topApplications.map((app) => (
                            <ResourceItemCard linkPath="/applications" item={app} />
                        ))}
                    </ResponsiveGrid>

                </Box>

                <Divider my={6} />

                <Heading as="h2" size="lg" color="purple.500">
                    Resource Consumption Over Time
                </Heading>

                {/* Replace the placeholder chart with your actual LineChart */}
                <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
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

                <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
                    <PieChart width={600} height={500}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
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

const MostUsedResourceCard = ({ resource }) => {
    return (
        <Box bg="gray.50" p={4} borderRadius="md" boxShadow="md">
            <Heading as="h2" size="lg" color="purple.500" mb={4}>
                Most Used Resource
            </Heading>
            <Box>
                <Text fontSize="md" fontWeight={600}>
                    {resource?.name}
                </Text>
                <Text fontSize="md" fontWeight={600}>
                    Consumed Quantity: {resource?.value}
                </Text>
            </Box>
        </Box>
    );
};


export default HomePage;

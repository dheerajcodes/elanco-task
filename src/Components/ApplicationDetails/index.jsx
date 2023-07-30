import React, { useEffect, useState } from 'react';


import { Box, Container, Text, SimpleGrid, Divider, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useParams } from 'react-router-dom';

import StatCard from '../StatsCard';

const ApplicationDetailsPage = () => {

    const { appName } = useParams();

    const [application, setApplication] = useState([]);
    const [loading, setLoading] = useState(true);

    // Calculate total consumed quantity and total cost
    const totalConsumedQuantity = application.reduce((sum, item) => sum + parseInt(item.ConsumedQuantity), 0);
    const totalCost = application.reduce((sum, item) => sum + parseFloat(item.Cost), 0).toFixed(2);

    // Prepare data for the LineChart and BarChart
    const chartData = application.map(item => ({ date: item.Date, consumedQuantity: parseInt(item.ConsumedQuantity) }));

    const averageConsumedQuantity = (totalConsumedQuantity / application.length).toFixed(2);

    // Calculate the most consumed resource
    const resourceUsageMap = new Map();
    application.forEach(item => {
        const resourceName = item.ServiceName;
        if (resourceUsageMap.has(resourceName)) {
            const existingData = resourceUsageMap.get(resourceName);
            existingData.consumedQuantity += parseFloat(item.ConsumedQuantity);
            existingData.cost += parseFloat(item.Cost);
            resourceUsageMap.set(resourceName, existingData);
        } else {
            resourceUsageMap.set(resourceName, {
                consumedQuantity: parseFloat(item.ConsumedQuantity),
                cost: parseFloat(item.Cost),
            });
        }
    });

    const mostConsumedResource = Array.from(resourceUsageMap.entries()).reduce(
        (maxResource, [resourceName, data]) => {
            return data.consumedQuantity > maxResource.consumedQuantity
                ? { resourceName, ...data }
                : maxResource;
        },
        { consumedQuantity: 0 }
    );

    useEffect(() => {
        axios.get(`https://engineering-task.elancoapps.com/api/applications/${appName}`)
            .then((response) => {
                setApplication(response.data);
                setLoading(false);
            }).catch((error) => {
                console.error('Error fetching data:', error.message);
                setLoading(false);
            })
    }, []);


    if (loading) {
        return <Text fontSize={70} color='green.400'>Loading...</Text>;
    }


    if (!application) {
        return <div>Resource not found</div>;
    }

    return (
        <Container maxW="container.xl" alignSelf='center' pb={10} width='100%'>
            <Text as="h1" fontSize="3xl" fontWeight="bold" mb={4} color='purple.400'>
                Application Details
            </Text>
            <Text fontSize="xl" fontWeight="medium" mb={4} color='green.500'>
                <Text color='purple.400' mr={6} display='inline'>Application: </Text> {appName}
            </Text>

            <Divider my={6} />


            <SimpleGrid columns={{ sm: 1, md: 2, lg: 4 }} spacing={6}>
                <StatCard label="Total Consumed Quantity:" value={totalConsumedQuantity} />
                <StatCard label="Average Consumed Quantity:" value={averageConsumedQuantity} />
                <StatCard label="Total Cost" value={totalCost} /> {/* Round totalCost to 2 decimal places */}
            </SimpleGrid>

            <Divider my={6} />

            {/* Most Consumed Resource */}
            <Box bg="gray.50" p={4} mb={8} mt={8}>
                <Text as="h3" fontSize="lg" fontWeight="bold" mb={4} color='purple.500'>
                    Most Consumed Resource
                </Text>
                <Box>
                    <Heading as="h3" size="md" mb={2} >
                        {mostConsumedResource.resourceName}
                    </Heading>
                    <Box>
                        <Text fontSize="md" fontWeight='semibold' >
                            Consumed Quantity: {mostConsumedResource.consumedQuantity.toFixed(2)}
                        </Text>
                        <Text fontSize="md" fontWeight='semibold'>
                            Total Cost: {mostConsumedResource.cost.toFixed(2)}
                        </Text>
                    </Box>
                </Box>
            </Box>

            <Divider my={6} />

            {/* Resource Consumption Over Time (Line Chart) */}
            <Box bg="gray.50" p={4} mb={8} mt={8}>
                <Text as="h3" fontSize="lg" fontWeight="bold" mb={4} color='purple.500'>
                    Resource Consumption Over Time
                </Text>
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

            {/* Resource Consumption by Date (Bar Chart) */}
            <Box bg="gray.50" p={4} mb={8} >
                <Text as="h3" fontSize="lg" fontWeight="bold" mb={4} color='purple.500'>
                    Resource Consumption by Date
                </Text>
                <BarChart width={800} height={400} data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="consumedQuantity" name="Consumed Quantity" fill="#8884d8" />
                </BarChart>
            </Box>

            <Divider my={6} />
        </Container>
    );
};

export default ApplicationDetailsPage;

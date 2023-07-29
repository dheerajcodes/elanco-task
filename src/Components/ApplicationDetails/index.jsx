import React, { useEffect, useState } from 'react';


import { Box, Container, Text } from '@chakra-ui/react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, BarChart, Bar } from 'recharts';
import { useParams } from 'react-router-dom';

const ApplicationDetailsPage = () => {

    const { appName } = useParams();

    const [application, setApplication] = useState([]);
    const [loading, setLoading] = useState(true);

    // Calculate total consumed quantity and total cost
    const totalConsumedQuantity = application.reduce((sum, item) => sum + parseInt(item.ConsumedQuantity), 0);
    const totalCost = application.reduce((sum, item) => sum + parseFloat(item.Cost), 0);

    // Prepare data for the LineChart and BarChart
    const chartData = application.map(item => ({ date: item.Date, consumedQuantity: parseInt(item.ConsumedQuantity) }));
    console.log('cd', chartData)

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


            <Text fontSize="xl" fontWeight="medium" mb={4} color='green.500'>
                <Text color='purple.400' mr={6} display='inline'>Total Consumed Quantity:</Text> {totalConsumedQuantity}
            </Text>

            <Text fontSize="xl" fontWeight="medium" mb={4} color='green.500'>
                <Text color='purple.400' mr={6} display='inline'>Total Cost: </Text>{totalCost}
            </Text>

            {/* Resource Consumption Over Time (Line Chart) */}
            <Box bg="white" p={4} mb={8}>
                <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
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

            {/* Resource Consumption by Date (Bar Chart) */}
            <Box bg="white" p={4} mb={8}>
                <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
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
        </Container>
    );
};

export default ApplicationDetailsPage;

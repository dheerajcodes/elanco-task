import axios from 'axios';
import { useEffect, useState } from 'react';
import {  GridItem, Text, Container } from '@chakra-ui/react';
import ResourceItemCard from './ResourceItemCard';
import ResponsiveGrid from './ResponsiveGrid';





const ResourceGrid = ({ heading, apiEndpoint, linkPath }) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        axios
            .get(apiEndpoint)
            .then((response) => {
                setResources(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [apiEndpoint]);

    return (
        <Container maxW="container.xl" pb={10}>
            <Text as="h1" fontSize={{ base: '2xl', md: '3x', lg: '4xl' }} fontWeight="semibold" mb={4} color="purple.400">
                {heading}
            </Text>
            <ResponsiveGrid columnCount={4}>
                {resources.map((item, index) => (
                    <GridItem key={index}>
                        <ResourceItemCard linkPath={linkPath} item={item} />
                    </GridItem>
                ))}
            </ResponsiveGrid>
        </Container>
    );
};

export default ResourceGrid;

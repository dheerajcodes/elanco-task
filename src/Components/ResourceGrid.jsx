import axios from 'axios';
import { useEffect, useState } from 'react';
import { Grid, GridItem, Box, Text, useMediaQuery, Container } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ResourceGrid = ({ heading, apiEndpoint, linkPath }) => {
    const [isLargeScreen] = useMediaQuery('(min-width: 992px)');
    const [isMediumScreen] = useMediaQuery('(min-width: 768px) and (max-width: 991px)');
    const [isSmallScreen] = useMediaQuery('(max-width: 767px)');

    let columnCount = 1;
    if (isLargeScreen) {
        columnCount = 4;
    } else if (isMediumScreen) {
        columnCount = 3;
    } else if (isSmallScreen) {
        columnCount = 1;
    }

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
            <Grid templateColumns={`repeat(${columnCount}, 1fr)`} gap={isSmallScreen ? 4 : 8}>
                {resources.map((item, index) => (
                    <GridItem key={index}>
                        <Link to={`${linkPath}/${item}`} style={{ textDecoration: 'none' }}>
                            <Box
                                p={4}
                                bg="white"
                                color="black"
                                fontWeight={600}
                                borderColor="gray.300"
                                borderWidth="1px"
                                borderRadius="md"
                                boxShadow="md"
                                textAlign="center"
                                transition="all 0.2s"
                                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                            >
                                <Text fontWeight="semibold">{item}</Text>
                            </Box>
                        </Link>
                    </GridItem>
                ))}
            </Grid>
        </Container>
    );
};

export default ResourceGrid;

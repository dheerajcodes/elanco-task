import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Text, Box, Divider } from '@chakra-ui/react';
import MyLineChart from '../Charts/MyLineChart';
import MyBarChart from '../Charts/MyBarChart';
import ResponsiveGrid from '../ResponsiveGrid';
import ResourceItemCard from '../ResourceItemCard';

const ResourceDetails = () => {
  const { slug: resourceName } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationsUsingResource, setApplicationsUsingResource] = useState([]);



  useEffect(() => {
    axios
      .get(`https://engineering-task.elancoapps.com/api/resources/${resourceName}`)
      .then((response) => {
        setResource(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error.message);
        setLoading(false);
      });
  }, [resourceName]);

  useEffect(() => {
    if (resource) {
      axios
        .get(`https://engineering-task.elancoapps.com/api/applications?ServiceName=${resourceName}`)
        .then((response) => {
          setApplicationsUsingResource(response.data);
          console.log('aur', applicationsUsingResource[0]);
        })
        .catch((error) => {
          console.error('Error fetching applications using the resource:', error.message);
        });
    }
  }, [resource]);

  if (loading) {
    return <Text fontSize={70} color="green.400">Loading...</Text>;
  }

  if (!resource) {
    return <div>Resource not found</div>;
  }

  return (
    <Container maxW="container.xl" alignSelf="center" pb={10} width="100%">
      <Box mb={8}>
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb={4} color="purple.400">
          Resource Details
        </Text>
        <Divider my={6} />
        <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md" mb={4}>
          <Text as="h2" fontSize="xl" fontWeight="medium" color="green.500">
            <Text color="purple.400" mr={6} display="inline">Resource Name:</Text> {resourceName}
          </Text>
        </Box>
        <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md" mb={4}>
          <Text as="h2" fontSize="xl" fontWeight="medium" mt={2} color="green.500">
            <Text color="purple.400" mr={6} display="inline">Resource Group:</Text> {resource[0].ResourceGroup}
          </Text>
        </Box>
        <Box p={4} bg="gray.50" borderRadius="md" boxShadow="md" mb={4}>
          <Text as="h2" fontSize="xl" fontWeight="medium" color="green.500">
            <Text color="purple.400" mr={6} display="inline">Number of applications using the resource:</Text> {applicationsUsingResource.length}
          </Text>
        </Box>
      </Box>

      <Divider my={6} />

      <Box bg="gray.50" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4} color='purple.500'>
          Resource Consumption Over Time (Quantity)
        </Text>
        <MyLineChart data={resource} dataKey="Date" />
      </Box>

      <Divider my={6} />

      <Box bg="gray.50" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4} color='purple.500'>
          Resource Consumption Over Time (Cost)
        </Text>
        <MyBarChart data={resource} />
      </Box>

      <Divider my={6} />

      {/* List of applications using the resource */}
      <Box bg="gray.50" p={4} mb={8}>
        <Text as="h1" fontSize="2xl" fontWeight="bold" mb={8} color='purple.500' >
          Applications Using This Resource
        </Text>
        <ResponsiveGrid>
          {applicationsUsingResource.map((app) => (
            <ResourceItemCard linkPath="/applications" item={app} />
          ))}
        </ResponsiveGrid>
      </Box>

      <Divider my={6} />
    </Container>
  );
};

export default ResourceDetails;

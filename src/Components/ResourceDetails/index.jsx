import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Container, Flex, Text, Box } from '@chakra-ui/react';
import MyLineChart from '../Charts/MyLineChart';
import MyBarChart from '../Charts/MyBarChart';

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

      <Box bg="gray.50" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
          Resource Consumption Over Time (Quantity)
        </Text>
        <MyLineChart data={resource} dataKey="Date" />
      </Box>

      <Box bg="gray.50" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
          Resource Consumption Over Time (Cost)
        </Text>
        <MyBarChart data={resource} />
      </Box>

      {/* List of applications using the resource */}
      <Box bg="gray.50" p={4} mb={8}>
        <Text as="h1" fontSize="2xl" fontWeight="bold" mb={8} color='purple.500' >
          Applications Using This Resource
        </Text>
        <Flex flexWrap="wrap" justify="space-around" gap={4}>
          {applicationsUsingResource.map((app) => (
            <Link key={app.InstanceId} to={`/applications/${app}`} style={{ textDecoration: 'none' }}>
              <Box
                p={4}
                bg="white"
                minHeight={20}
                color="black"
                fontWeight={600}
                borderColor="gray.300"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
                transition="all 0.2s"
                _hover={{ boxShadow: 'lg', transform: 'scale(1.05)' }}
                mb={4}
                width="200px"
              >
                <Text fontWeight="semibold">{app}</Text>
              </Box>
            </Link>
          ))}
        </Flex>
      </Box>
    </Container>
  );
};

export default ResourceDetails;

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Container, Flex, Text, Box, Menu, MenuButton, Button, MenuItem, MenuList } from '@chakra-ui/react';

const ResourceDetails = () => {
  const { slug: resourceName } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applicationsUsingResource, setApplicationsUsingResource] = useState([]);


  const navigate = useNavigate();

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

  // const handleApplicationChange = (event) => {
  //   const selectedAppName = event.target.value;
  //   setSelectedApplication(selectedAppName);
  // };

  if (loading) {
    return <Text fontSize={70} color="green.400">Loading...</Text>;
  }

  if (!resource) {
    return <div>Resource not found</div>;
  }

  return (
    <Container maxW="container.xl" alignSelf="center" pb={10} width="100%">
      <Flex justify="flex-end" mb={4}>
        {/* Dropdown to show applications using the resource */}
        <Menu>
          <MenuButton as={Button} colorScheme="purple" size="sm">
            Applications Using This Resource
          </MenuButton>
          <MenuList maxH="500px" overflowY="auto">
            {applicationsUsingResource.map((app) => (
              <MenuItem key={app.InstanceId} value={app} onClick={() => navigate(`/applications/${app}`)}>
                {app}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>

      <Box mb={8}>
        <Text as="h1" fontSize="3xl" fontWeight="bold" mb={4} color='purple.400'>
          Resource Details
        </Text>
        <Text as="h2" fontSize="xl" fontWeight="medium" color='green.500'>
          <Text color='purple.400' mr={6} display='inline'>Resource Name:</Text> {resourceName}
        </Text>
        <Text as="h2" fontSize="xl" fontWeight="medium" mt={2} color='green.500'>
          <Text color='purple.400' mr={6} display='inline'>Resource Group:</Text> {resource[0].ResourceGroup}
        </Text>
        <Text as="h2" fontSize="xl" fontWeight="medium" color='green.500'>
          <Text color='purple.400' mr={6} display='inline'>Number of applications using the resource:</Text> {applicationsUsingResource.length}
        </Text>
      </Box>

      {/* Create a LineChart to display resource consumption over time */}
      <Box bg="white" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
          Resource Consumption Over Time (Quantity)
        </Text>
        <LineChart width={800} height={400} data={resource} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="ConsumedQuantity" name="Consumed Quantity" stroke="#8884d8" />
        </LineChart>
      </Box>

      {/* Create a BarChart to display resource consumption over time (Cost) */}
      <Box bg="white" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
          Resource Consumption Over Time (Cost)
        </Text>
        <BarChart width={800} height={400} data={resource} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Cost" name="Cost" fill="#82ca9d" />
        </BarChart>
      </Box>
    </Container>
  );
};

export default ResourceDetails;

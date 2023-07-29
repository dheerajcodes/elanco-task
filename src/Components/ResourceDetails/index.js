import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Flex, Text, Box, Menu, MenuButton, Button, MenuItem, MenuList } from '@chakra-ui/react';
import MyLineChart from '../Charts/MyLineChart';
import MyBarChart from '../Charts/MyBarChart';

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

      <Box bg="white" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
          Resource Consumption Over Time (Quantity)
        </Text>
        <MyLineChart data={resource} dataKey="Date"/>
      </Box>

      <Box bg="white" p={4} mb={8}>
        <Text as="h3" fontSize="lg" fontWeight="bold" mb={4}>
          Resource Consumption Over Time (Cost)
        </Text>
        <MyBarChart data={resource}/>
      </Box>
    </Container>
  );
};

export default ResourceDetails;

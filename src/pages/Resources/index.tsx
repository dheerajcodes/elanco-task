import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Grid, GridItem, Box, Flex, Text, Image, useMediaQuery } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import convertToSlug from '../../utils/convertToSlug';



export default function Resources() {
  const [isLargeScreen] = useMediaQuery("(min-width: 992px)");
  const [isMediumScreen] = useMediaQuery("(min-width: 768px) and (max-width: 991px)");
  const [isSmallScreen] = useMediaQuery("(max-width: 767px)");

  let columnCount = 1;
  if (isLargeScreen) {
    columnCount = 4;
  } else if (isMediumScreen) {
    columnCount = 3;
  } else if (isSmallScreen) {
    columnCount = 2;
  }

  const [resources, setReources] = useState([]);

  const [resourceDetails, showResourceDetails] = useState('false');

  useEffect(() => {
    axios.get('https://engineering-task.elancoapps.com/api/resources').then((response) => {
      setReources(response.data);
    }).catch((err) => {
      console.log(err);
    })
  })

  return (
    <Grid
      templateColumns={`repeat(${columnCount}, 1fr)`}
      gap={isSmallScreen ? 4 : 8}
    >
      {
        resources.map((item, index) => (
          <GridItem key={index}>
            <Link
              to={`/resources/${convertToSlug(item)}`}
              style={{ textDecoration: 'none' }}
            >
              <Box
                p={4}
                bg="white"
                color='black'
                fontWeight={600}
                borderRadius="md"
                boxShadow="md"
                textAlign="center"
                transition="all 0.2s"
                _hover={{ boxShadow: "lg", transform: "scale(1.05)" }}
              >
                <Text fontWeight="semibold">{item}</Text>
              </Box>
            </Link>
          </GridItem>
        ))
      }
    </Grid >
  )
}


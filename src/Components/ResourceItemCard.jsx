import { Link } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";


const ResourceItemCard = ({ linkPath, item }) => {
    return (
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
    );
};

export default ResourceItemCard;
import { Box, Flex, Text, Button } from "@chakra-ui/react";

const Header = () => {
    return (
        <Box 
        bg="white.500" color="white" 
        p={4} 
        border= '2px solid white'
        mb={8}
        >
            <Flex alignItems="center" justifyContent="space-between">
                <Text fontSize="xl">My App</Text>
               
            </Flex>
        </Box>
    );
};

export default Header;

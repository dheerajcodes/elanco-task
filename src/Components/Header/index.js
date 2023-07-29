import { Flex, Text, Button, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Flex
            bg="purple.300"
            color="white"
            py={4}
            justifyContent="space-between"
            alignItems="center"
            fontWeight="bold"
            height={100}
            mb={8}
            p={8}
            width="100%"
        >
            <Button as={Link} to="/" colorScheme="purple" mr={2}>
                Home
            </Button>
            <Box>
                <Button as={Link} to="/applications" colorScheme="purple" mr={2}>
                    Applications
                </Button>
                <Button as={Link} to="/resources" colorScheme="purple">
                    Resources
                </Button>
            </Box>
        </Flex>
    );
};

export default Header;


import { Flex, Stat, StatLabel,  StatNumber } from "@chakra-ui/react";

const StatCard = ({ label, value }) => {
    return (
        <Flex
            bg="gray.100"
            p={4}
            borderRadius="md"
            boxShadow="md"
            textAlign="center"
            _hover={{ boxShadow: 'lg' }}
            height="150px" // Adjust the height as per your requirement
            width="300px" // Adjust the width as per your requirement
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
        >
            <Stat>
                <StatLabel fontSize='xl' color="purple.400" fontWeight="bold">
                    {label}
                </StatLabel>
                <StatNumber fontSize="5xl" color="black.600" mt={2}>
                    {value}
                </StatNumber>
            </Stat>
        </Flex>
    );
};

export default StatCard;
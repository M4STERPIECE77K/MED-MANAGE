import { Box, Grid, Heading, Text } from '@chakra-ui/react';
import { services } from '../../data/sampleData';

export const ServicesSection = () => {
    return (
        <Box as="section" py="5rem" px="2rem" maxW="1400px" mx="auto" id="services">
            <Heading
                as="h2"
                fontFamily="'Crimson Pro', serif"
                fontSize="2.8rem"
                textAlign="center"
                color="primary"
                mb="3rem"
            >
                Nos Services
            </Heading>

            <Grid
                templateColumns="repeat(auto-fit, minmax(280px, 1fr))"
                gap="2rem"
            >
                {services.map((service) => (
                    <Box
                        key={service.id}
                        bg="white"
                        p="2rem"
                        borderRadius="12px"
                        boxShadow="0 1px 3px rgba(10, 77, 104, 0.08)"
                        transition="all 0.3s"
                        border="2px solid transparent"
                        _hover={{
                            transform: 'translateY(-5px)',
                            boxShadow: '0 4px 12px rgba(10, 77, 104, 0.12)',
                            borderColor: 'accentSoft',
                        }}
                    >
                        <Box
                            w="60px"
                            h="60px"
                            bg="accentSoft"
                            borderRadius="12px"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="2rem"
                            mb="1.5rem"
                        >
                            {service.icon}
                        </Box>
                        <Heading
                            as="h3"
                            fontFamily="'Crimson Pro', serif"
                            fontSize="1.5rem"
                            color="primary"
                            mb="0.8rem"
                        >
                            {service.name}
                        </Heading>
                        <Text color="textGray" lineHeight="1.7">
                            {service.description}
                        </Text>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

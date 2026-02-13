import { Box, Table, Icon, Grid, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiCheckCircle, FiClock, FiDollarSign } from 'react-icons/fi';
import { GiTooth } from 'react-icons/gi';
import { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { services } from '../data/sampleData';

export const ServicesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryFilter, setCategoryFilter] = useState<string>('Tous');
    const [filteredServices, setFilteredServices] = useState(services);

    // Calculate statistics
    const totalServices = services.length;
    const activeServices = services.filter(s => (s.status || 'Actif') === 'Actif').length;
    const avgDuration = Math.round(
        services.reduce((acc, s) => acc + parseInt(s.duration ?? '0', 10), 0) / services.length
    );
    
    const prices = services.map(s => {
        const priceStr = (s.price ?? '0').replace(/[^0-9]/g, '');
        return parseInt(priceStr, 10) || 0;
    });
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const formatPrice = (value: number) => new Intl.NumberFormat('fr-MG', {
        style: 'currency',
        currency: 'MGA',
        maximumFractionDigits: 0,
    }).format(value);

    const categories = ['Tous', 'Consultation', 'Nettoyage', 'Esthétique', 'Chirurgie'];

    const handleCategoryFilter = (category: string) => {
        setCategoryFilter(category);
        if (category === 'Tous') {
            setFilteredServices(services);
        } else {
            const filtered = services.filter(s => 
                s.name.toLowerCase().includes(category.toLowerCase())
            );
            setFilteredServices(filtered.length > 0 ? filtered : services);
        }
    };

    return (
        <Box>
            <Grid
                templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
                gap="1.25rem"
                mb="2rem"
            >
                <Box
                    bg="white"
                    p="1.5rem"
                    borderRadius="12px"
                    border="1px solid rgba(10, 77, 104, 0.1)"
                    boxShadow="0 2px 8px rgba(10, 77, 104, 0.06)"
                    transition="all 0.3s ease"
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(10, 77, 104, 0.12)',
                    }}
                >
                    <Flex align="center" gap="0.75rem" mb="0.5rem">
                        <Box fontSize="2rem" color="accent">
                            <Icon as={GiTooth} />
                        </Box>
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Total Services
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="primary"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {totalServices}
                    </Text>
                </Box>

                <Box
                    bg="white"
                    p="1.5rem"
                    borderRadius="12px"
                    border="1px solid rgba(34, 197, 94, 0.2)"
                    boxShadow="0 2px 8px rgba(34, 197, 94, 0.08)"
                    transition="all 0.3s ease"
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)',
                    }}
                >
                    <Flex align="center" gap="0.75rem" mb="0.5rem">
                        <Box fontSize="2rem" color="#22c55e">
                            <Icon as={FiCheckCircle} />
                        </Box>
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Services Actifs
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="#22c55e"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {activeServices}
                    </Text>
                </Box>

                <Box
                    bg="white"
                    p="1.5rem"
                    borderRadius="12px"
                    border="1px solid rgba(5, 199, 226, 0.2)"
                    boxShadow="0 2px 8px rgba(5, 199, 226, 0.08)"
                    transition="all 0.3s ease"
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(5, 199, 226, 0.15)',
                    }}
                >
                    <Flex align="center" gap="0.75rem" mb="0.5rem">
                        <Box fontSize="2rem" color="accent">
                            <Icon as={FiClock} />
                        </Box>
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Durée Moyenne
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="accent"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {avgDuration} min
                    </Text>
                </Box>

                <Box
                    bg="white"
                    p="1.5rem"
                    borderRadius="12px"
                    border="1px solid rgba(251, 191, 36, 0.2)"
                    boxShadow="0 2px 8px rgba(251, 191, 36, 0.08)"
                    transition="all 0.3s ease"
                    _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(251, 191, 36, 0.15)',
                    }}
                >
                    <Flex align="center" gap="0.75rem" mb="0.5rem">
                        <Box fontSize="2rem" color="#fbbf24">
                            <Icon as={FiDollarSign} />
                        </Box>
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Prix Moyen
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="#fbbf24"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {formatPrice(avgPrice)}
                    </Text>
                </Box>
            </Grid>

            {/* Services Table */}
            <Box
                bg="white"
                borderRadius="12px"
                p="1.5rem"
                boxShadow="0 2px 12px rgba(10, 77, 104, 0.08)"
                border="1px solid rgba(10, 77, 104, 0.08)"
            >
                {/* Header with Add Button */}
                <Flex 
                    justify="space-between" 
                    align="center" 
                    mb="1.5rem"
                    flexWrap="wrap"
                    gap="1rem"
                >
                    <Box>
                        <Heading
                            as="h2"
                            fontFamily="'Crimson Pro', serif"
                            fontSize="1.5rem"
                            color="primary"
                            mb="0.25rem"
                            fontWeight="700"
                        >
                            Services disponibles
                        </Heading>
                        <Text 
                            fontSize="0.85rem" 
                            color="rgba(10, 77, 104, 0.6)"
                            fontWeight="500"
                        >
                            {filteredServices.length} service{filteredServices.length > 1 ? 's' : ''} disponible{filteredServices.length > 1 ? 's' : ''}
                        </Text>
                    </Box>

                    <Button
                        onClick={() => setIsModalOpen(true)}
                        bg="primary"
                        color="white"
                        border="2px solid transparent"
                        px="1.25rem"
                        py="0.6rem"
                        borderRadius="8px"
                        cursor="pointer"
                        fontWeight="600"
                        fontSize="0.9rem"
                        transition="all 0.3s ease"
                        _hover={{
                            bg: 'rgba(10, 77, 104, 0.9)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(10, 77, 104, 0.3)',
                        }}
                    >
                        + Nouveau service
                    </Button>
                </Flex>

                {/* Category Filter Pills */}
                <Flex gap="0.75rem" mb="1.5rem" flexWrap="wrap">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => handleCategoryFilter(category)}
                            bg={categoryFilter === category ? 'primary' : 'white'}
                            color={categoryFilter === category ? 'white' : 'primary'}
                            border="2px solid"
                            borderColor={categoryFilter === category ? 'primary' : 'rgba(10, 77, 104, 0.2)'}
                            px="1rem"
                            py="0.5rem"
                            borderRadius="20px"
                            cursor="pointer"
                            fontWeight="600"
                            fontSize="0.85rem"
                            transition="all 0.3s ease"
                            _hover={{
                                bg: categoryFilter === category ? 'rgba(10, 77, 104, 0.9)' : 'rgba(10, 77, 104, 0.05)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 2px 8px rgba(10, 77, 104, 0.15)',
                            }}
                        >
                            {category}
                        </Button>
                    ))}
                </Flex>
                <Box 
                    overflowX="auto"
                    borderRadius="8px"
                    border="1px solid rgba(10, 77, 104, 0.1)"
                >
                    <Table.Root variant="line" size="md">
                        <Table.Header bg="rgba(10, 77, 104, 0.04)">
                            <Table.Row>
                                <Table.ColumnHeader
                                    fontWeight="700"
                                    fontSize="0.85rem"
                                    color="primary"
                                    textTransform="uppercase"
                                    letterSpacing="0.5px"
                                    py="1rem"
                                    px="1.25rem"
                                    minW="250px"
                                >
                                    Service
                                </Table.ColumnHeader>
                                <Table.ColumnHeader
                                    fontWeight="700"
                                    fontSize="0.85rem"
                                    color="primary"
                                    textTransform="uppercase"
                                    letterSpacing="0.5px"
                                    py="1rem"
                                    px="1.25rem"
                                >
                                    Durée
                                </Table.ColumnHeader>
                                <Table.ColumnHeader
                                    fontWeight="700"
                                    fontSize="0.85rem"
                                    color="primary"
                                    textTransform="uppercase"
                                    letterSpacing="0.5px"
                                    py="1rem"
                                    px="1.25rem"
                                >
                                    Prix
                                </Table.ColumnHeader>
                                <Table.ColumnHeader
                                    fontWeight="700"
                                    fontSize="0.85rem"
                                    color="primary"
                                    textTransform="uppercase"
                                    letterSpacing="0.5px"
                                    py="1rem"
                                    px="1.25rem"
                                >
                                    Statut
                                </Table.ColumnHeader>
                                <Table.ColumnHeader
                                    fontWeight="700"
                                    fontSize="0.85rem"
                                    color="primary"
                                    textTransform="uppercase"
                                    letterSpacing="0.5px"
                                    py="1rem"
                                    px="1.25rem"
                                >
                                    Actions
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {filteredServices.map((service, index) => (
                                <Table.Row
                                    key={service.id}
                                    _hover={{ 
                                        bg: 'rgba(5, 199, 226, 0.04)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    borderBottom={
                                        index === filteredServices.length - 1 
                                            ? 'none' 
                                            : '1px solid rgba(10, 77, 104, 0.08)'
                                    }
                                >
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        fontWeight="600"
                                        color="primary"
                                        fontSize="0.95rem"
                                    >
                                        <Flex align="center" gap="0.75rem">
                                            <Box
                                                bg="rgba(5, 199, 226, 0.1)"
                                                borderRadius="8px"
                                                p="0.5rem"
                                                fontSize="1.25rem"
                                                color="accent"
                                            >
                                                <Icon as={GiTooth} />
                                            </Box>
                                            {service.name}
                                        </Flex>
                                    </Table.Cell>
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        color="rgba(10, 77, 104, 0.8)"
                                        fontSize="0.9rem"
                                    >
                                        <Flex align="center" gap="0.5rem">
                                            <Box fontSize="0.9rem" color="accent">
                                                <Icon as={FiClock} />
                                            </Box>
                                            <Text fontWeight="500">{service.duration}</Text>
                                        </Flex>
                                    </Table.Cell>
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        color="primary"
                                        fontSize="0.95rem"
                                        fontWeight="700"
                                    >
                                        {formatPrice(prices[index] ?? 0)}
                                    </Table.Cell>
                                    <Table.Cell py="1rem" px="1.25rem">
                                        <Badge status={service.status || 'Actif'}>
                                            {service.status || 'Actif'}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell py="1rem" px="1.25rem">
                                        <Flex gap="0.5rem">
                                            <Box
                                                as="button"
                                                bg="rgba(5, 199, 226, 0.1)"
                                                border="1px solid rgba(5, 199, 226, 0.2)"
                                                cursor="pointer"
                                                p="0.5rem"
                                                borderRadius="6px"
                                                transition="all 0.3s ease"
                                                color="accent"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                _hover={{ 
                                                    bg: 'rgba(5, 199, 226, 0.2)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 2px 8px rgba(5, 199, 226, 0.3)'
                                                }}
                                                title="Modifier"
                                            >
                                                <Icon as={FiEdit2} boxSize="1.1rem" />
                                            </Box>
                                            <Box
                                                as="button"
                                                bg="rgba(220, 38, 38, 0.1)"
                                                border="1px solid rgba(220, 38, 38, 0.2)"
                                                cursor="pointer"
                                                p="0.5rem"
                                                borderRadius="6px"
                                                transition="all 0.3s ease"
                                                color="#dc2626"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                                _hover={{ 
                                                    bg: 'rgba(220, 38, 38, 0.2)',
                                                    transform: 'translateY(-2px)',
                                                    boxShadow: '0 2px 8px rgba(220, 38, 38, 0.3)'
                                                }}
                                                title="Supprimer"
                                            >
                                                <Icon as={FiTrash2} boxSize="1.1rem" />
                                            </Box>
                                        </Flex>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Box>
            </Box>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nouveau service"
            >
                <Box>
                    <Text>Formulaire de création de service à implémenter</Text>
                </Box>
            </Modal>
        </Box>
    );
};
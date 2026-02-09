import { Box, Table, Grid, Flex, Heading, Text, Input, Button, Badge as ChakraBadge, Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { Modal } from '../components/common/Modal';
import { samplePatients } from '../data/sampleData';
import type { Patient } from '../types';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2, FiUsers, FiUserCheck, FiUserPlus, FiSearch } from 'react-icons/fi';

export const PatientsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>(samplePatients);
    const [searchValue, setSearchValue] = useState('');

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
        const filtered = samplePatients.filter(
            (patient) =>
                patient.name.toLowerCase().includes(value.toLowerCase()) ||
                patient.email.toLowerCase().includes(value.toLowerCase()) ||
                patient.phone.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    // Calculate statistics 
    const totalPatients = samplePatients.length;
    const activePatients = samplePatients.filter(patient => {
        const lastVisit = new Date(patient.lastVisit);
        const monthsAgo = (Date.now() - lastVisit.getTime()) / (1000 * 60 * 60 * 24 * 30);
        return monthsAgo < 6;
    }).length;
    const newThisMonth = samplePatients.filter(patient => {
        const lastVisit = new Date(patient.lastVisit);
        const now = new Date();
        return lastVisit.getMonth() === now.getMonth() && lastVisit.getFullYear() === now.getFullYear();
    }).length;

    return (
        <Box>
            {/* Statistics Cards */}
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
                        <Icon as={FiUsers} boxSize="1.5rem" color="primary" />
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Total Patients
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="primary"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {totalPatients}
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
                        <Icon as={FiUserCheck} boxSize="1.5rem" color="accent" />
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Actifs (6 mois)
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="accent"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {activePatients}
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
                        <Icon as={FiUserPlus} boxSize="1.5rem" color="#22c55e" />
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Nouveaux ce mois
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="#22c55e"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {newThisMonth}
                    </Text>
                </Box>
            </Grid>

            {/* Patients Table */}
            <Box
                bg="white"
                borderRadius="12px"
                p="1.5rem"
                boxShadow="0 2px 12px rgba(10, 77, 104, 0.08)"
                border="1px solid rgba(10, 77, 104, 0.08)"
            >
                {/* Header with Search and Add Button */}
                <Flex 
                    justify="space-between" 
                    align="center" 
                    mb="1.5rem"
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
                            Liste des patients
                        </Heading>
                        <Text 
                            fontSize="0.85rem" 
                            color="rgba(10, 77, 104, 0.6)"
                            fontWeight="500"
                        >
                            {filteredPatients.length} patient{filteredPatients.length > 1 ? 's' : ''} {searchValue && '(filtrés)'}
                        </Text>
                    </Box>

                    <Flex gap="0.75rem" align="center" flexWrap="nowrap" w="100%" maxW="520px">
                        <Input
                            placeholder="🔍 Rechercher un patient..."
                            value={searchValue}
                            onChange={(e) => handleSearch(e.target.value)}
                            border="2px solid rgba(10, 77, 104, 0.15)"
                            borderRadius="8px"
                            px="1rem"
                            py="0.6rem"
                            fontSize="0.9rem"
                            flex="1"
                            transition="all 0.3s ease"
                            _focus={{
                                borderColor: 'accent',
                                boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                                outline: 'none',
                            }}
                            _hover={{
                                borderColor: 'rgba(10, 77, 104, 0.25)',
                            }}
                        />
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
                            whiteSpace="nowrap"
                            _hover={{
                                bg: 'rgba(10, 77, 104, 0.9)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 4px 12px rgba(10, 77, 104, 0.3)',
                            }}
                        >
                            + Nouveau patient
                        </Button>
                    </Flex>
                </Flex>

                {/* Table */}
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
                                >
                                    ID
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
                                    Nom complet
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
                                    Email
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
                                    Téléphone
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
                                    Dernière visite
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
                            {filteredPatients.map((patient, index) => {
                                const lastVisit = new Date(patient.lastVisit);
                                const monthsAgo = (Date.now() - lastVisit.getTime()) / (1000 * 60 * 60 * 24 * 30);
                                const isActive = monthsAgo < 6;

                                return (
                                    <Table.Row
                                        key={patient.id}
                                        _hover={{ 
                                            bg: 'rgba(5, 199, 226, 0.04)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        borderBottom={
                                            index === filteredPatients.length - 1 
                                                ? 'none' 
                                                : '1px solid rgba(10, 77, 104, 0.08)'
                                        }
                                    >
                                        <Table.Cell 
                                            py="1rem" 
                                            px="1.25rem"
                                            fontWeight="700"
                                            color="rgba(10, 77, 104, 0.5)"
                                            fontSize="0.85rem"
                                        >
                                            #{patient.id}
                                        </Table.Cell>
                                        <Table.Cell 
                                            py="1rem" 
                                            px="1.25rem"
                                            fontWeight="600"
                                            color="primary"
                                            fontSize="0.95rem"
                                        >
                                            <Flex align="center" gap="0.5rem">
                                                {patient.name}
                                                {isActive && (
                                                    <ChakraBadge
                                                        bg="rgba(34, 197, 94, 0.1)"
                                                        color="#22c55e"
                                                        fontSize="0.65rem"
                                                        px="0.5rem"
                                                        py="0.15rem"
                                                        borderRadius="full"
                                                        fontWeight="600"
                                                    >
                                                        Actif
                                                    </ChakraBadge>
                                                )}
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell 
                                            py="1rem" 
                                            px="1.25rem"
                                            color="rgba(10, 77, 104, 0.7)"
                                            fontSize="0.9rem"
                                        >
                                            {patient.email}
                                        </Table.Cell>
                                        <Table.Cell 
                                            py="1rem" 
                                            px="1.25rem"
                                            color="rgba(10, 77, 104, 0.7)"
                                            fontSize="0.9rem"
                                            fontWeight="500"
                                        >
                                            {patient.phone}
                                        </Table.Cell>
                                        <Table.Cell 
                                            py="1rem" 
                                            px="1.25rem"
                                            color="rgba(10, 77, 104, 0.7)"
                                            fontSize="0.9rem"
                                        >
                                            {formatDate(patient.lastVisit)}
                                        </Table.Cell>
                                        <Table.Cell py="1rem" px="1.25rem">
                                            <Flex gap="0.5rem">
                                                <Box
                                                    as="button"
                                                    bg="rgba(5, 199, 226, 0.1)"
                                                    border="1px solid rgba(5, 199, 226, 0.2)"
                                                    cursor="pointer"
                                                    fontSize="1.1rem"
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
                                                        <Icon as={FiEdit2} boxSize="1.05rem" />
                                                </Box>
                                                <Box
                                                    as="button"
                                                    bg="rgba(220, 38, 38, 0.1)"
                                                    border="1px solid rgba(220, 38, 38, 0.2)"
                                                    cursor="pointer"
                                                    fontSize="1.1rem"
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
                                                        <Icon as={FiTrash2} boxSize="1.05rem" />
                                                </Box>
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Root>
                </Box>

                    <Flex
                        justify="center"
                        align="center"
                        gap="0.6rem"
                        mt="1.5rem"
                    >
                        <Button
                            bg="white"
                            color="primary"
                            border="1px solid rgba(10, 77, 104, 0.2)"
                            px="0.6rem"
                            py="0.5rem"
                            borderRadius="8px"
                            _hover={{ bg: 'rgba(10, 77, 104, 0.05)' }}
                        >
                            <Icon as={FiChevronLeft} />
                        </Button>
                        <Flex
                            gap="0.4rem"
                            bg="rgba(10, 77, 104, 0.04)"
                            border="1px solid rgba(10, 77, 104, 0.1)"
                            borderRadius="10px"
                            px="0.6rem"
                            py="0.4rem"
                        >
                            <Button size="sm" bg="primary" color="white" borderRadius="8px">
                                1
                            </Button>
                            <Button size="sm" bg="white" color="primary" borderRadius="8px">
                                2
                            </Button>
                            <Button size="sm" bg="white" color="primary" borderRadius="8px">
                                3
                            </Button>
                        </Flex>
                        <Button
                            bg="white"
                            color="primary"
                            border="1px solid rgba(10, 77, 104, 0.2)"
                            px="0.6rem"
                            py="0.5rem"
                            borderRadius="8px"
                            _hover={{ bg: 'rgba(10, 77, 104, 0.05)' }}
                        >
                            <Icon as={FiChevronRight} />
                        </Button>
                    </Flex>

                {/* Empty State */}
                {filteredPatients.length === 0 && (
                    <Box
                        textAlign="center"
                        py="3rem"
                    >
                        <Icon as={FiSearch} boxSize="3rem" color="rgba(10, 77, 104, 0.2)" mb="1rem" />
                        <Text
                            fontSize="1.1rem"
                            fontWeight="600"
                            color="primary"
                            mb="0.5rem"
                        >
                            Aucun patient trouvé
                        </Text>
                        <Text
                            fontSize="0.9rem"
                            color="rgba(10, 77, 104, 0.6)"
                        >
                            Essayez de modifier vos critères de recherche
                        </Text>
                    </Box>
                )}
            </Box>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nouveau patient"
            >
                <Box>Formulaire de création de patient à implémenter</Box>
            </Modal>
        </Box>
    );
};
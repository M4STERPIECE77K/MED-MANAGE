import { Box, Table, Text, Icon, Grid, Flex, Heading, Input, Button } from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiCalendar, FiCheckCircle, FiClock, FiSearch, FiCheck, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { sampleAppointments } from '../data/sampleData';
import type { Appointment } from '../types';

export const AppointmentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(sampleAppointments);
    const [searchValue, setSearchValue] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('Tous');

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const handleSearch = (value: string) => {
        setSearchValue(value);
        applyFilters(value, statusFilter);
    };

    const handleStatusFilter = (status: string) => {
        setStatusFilter(status);
        applyFilters(searchValue, status);
    };

    const applyFilters = (search: string, status: string) => {
        let filtered = sampleAppointments;
        if (search) {
            filtered = filtered.filter(
                (app) =>
                    app.patient.toLowerCase().includes(search.toLowerCase()) ||
                    app.email.toLowerCase().includes(search.toLowerCase()) ||
                    app.service.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (status !== 'Tous') {
            filtered = filtered.filter((app) => app.status === status);
        }

        setFilteredAppointments(filtered);
    };
    const totalAppointments = sampleAppointments.length;
    const confirmedCount = sampleAppointments.filter(app => app.status === 'Confirmé').length;
    const pendingCount = sampleAppointments.filter(app => app.status === 'En attente').length;
    const completedCount = sampleAppointments.filter(app => app.status === 'Terminé').length;

    const statusOptions = ['Tous', 'Confirmé', 'En attente', 'Terminé', 'Annulé'];

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
                        <Icon as={FiCalendar} boxSize="1.5rem" color="primary" />
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Total RDV
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="primary"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {totalAppointments}
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
                        <Icon as={FiCheckCircle} boxSize="1.5rem" color="#22c55e" />
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Confirmés
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="#22c55e"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {confirmedCount}
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
                        <Icon as={FiClock} boxSize="1.5rem" color="#fbbf24" />
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            En attente
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="#fbbf24"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {pendingCount}
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
                        <Icon as={FiCheck} boxSize="1.5rem" color="accent" />
                        <Text
                            fontSize="0.85rem"
                            fontWeight="600"
                            color="rgba(10, 77, 104, 0.7)"
                            textTransform="uppercase"
                            letterSpacing="0.5px"
                        >
                            Terminés
                        </Text>
                    </Flex>
                    <Text
                        fontSize="2rem"
                        fontWeight="700"
                        color="accent"
                        fontFamily="'Crimson Pro', serif"
                    >
                        {completedCount}
                    </Text>
                </Box>
            </Grid>

            {/* Appointments Table */}
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
                            Tous les rendez-vous
                        </Heading>
                        <Text 
                            fontSize="0.85rem" 
                            color="rgba(10, 77, 104, 0.6)"
                            fontWeight="500"
                        >
                            {filteredAppointments.length} rendez-vous {searchValue && '(filtrés)'}
                        </Text>
                    </Box>

                    <Flex gap="0.75rem" align="center" flexWrap="nowrap" w="100%" maxW="550px">
                        <Input
                            placeholder="🔍 Rechercher un patient, service..."
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
                            + Nouveau RDV
                        </Button>
                    </Flex>
                </Flex>

                {/* Status Filter Pills */}
                <Flex gap="0.75rem" mb="1.5rem" flexWrap="wrap">
                    {statusOptions.map((status) => (
                        <Button
                            key={status}
                            onClick={() => handleStatusFilter(status)}
                            bg={statusFilter === status ? 'primary' : 'white'}
                            color={statusFilter === status ? 'white' : 'primary'}
                            border="2px solid"
                            borderColor={statusFilter === status ? 'primary' : 'rgba(10, 77, 104, 0.2)'}
                            px="1rem"
                            py="0.5rem"
                            borderRadius="20px"
                            cursor="pointer"
                            fontWeight="600"
                            fontSize="0.85rem"
                            transition="all 0.3s ease"
                            _hover={{
                                bg: statusFilter === status ? 'rgba(10, 77, 104, 0.9)' : 'rgba(10, 77, 104, 0.05)',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 2px 8px rgba(10, 77, 104, 0.15)',
                            }}
                        >
                            {status}
                        </Button>
                    ))}
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
                                    Patient
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
                                    Contact
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
                                    Date & Heure
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
                            {filteredAppointments.map((appointment, index) => (
                                <Table.Row
                                    key={appointment.id}
                                    _hover={{ 
                                        bg: 'rgba(5, 199, 226, 0.04)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    borderBottom={
                                        index === filteredAppointments.length - 1 
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
                                        #{appointment.id}
                                    </Table.Cell>
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        fontWeight="600"
                                        color="primary"
                                        fontSize="0.95rem"
                                    >
                                        {appointment.patient}
                                    </Table.Cell>
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        color="rgba(10, 77, 104, 0.7)"
                                        fontSize="0.9rem"
                                    >
                                        <Box>
                                            <Text fontSize="0.9rem" mb="0.15rem">
                                                {appointment.email}
                                            </Text>
                                            <Text 
                                                fontSize="0.8rem" 
                                                color="rgba(10, 77, 104, 0.5)"
                                                fontWeight="500"
                                            >
                                                {appointment.phone}
                                            </Text>
                                        </Box>
                                    </Table.Cell>
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        color="rgba(10, 77, 104, 0.8)"
                                        fontSize="0.9rem"
                                        fontWeight="500"
                                    >
                                        {appointment.service}
                                    </Table.Cell>
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        color="rgba(10, 77, 104, 0.7)"
                                        fontSize="0.9rem"
                                    >
                                        <Box>
                                            <Text fontWeight="500">
                                                {formatDate(appointment.date)}
                                            </Text>
                                            <Text 
                                                fontSize="0.8rem" 
                                                color="rgba(10, 77, 104, 0.5)"
                                                mt="0.15rem"
                                            >
                                                à {appointment.time}
                                            </Text>
                                        </Box>
                                    </Table.Cell>
                                    <Table.Cell py="1rem" px="1.25rem">
                                        <Badge status={appointment.status}>
                                            {appointment.status}
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
                                                title="Annuler"
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
                {filteredAppointments.length === 0 && (
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
                            Aucun rendez-vous trouvé
                        </Text>
                        <Text
                            fontSize="0.9rem"
                            color="rgba(10, 77, 104, 0.6)"
                        >
                            Essayez de modifier vos filtres ou critères de recherche
                        </Text>
                    </Box>
                )}
            </Box>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Nouveau rendez-vous"
            >
                <Box>
                    <Text>Formulaire de création de rendez-vous à implémenter</Text>
                </Box>
            </Modal>
        </Box>
    );
};
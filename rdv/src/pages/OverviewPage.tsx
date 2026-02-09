import { Box, Grid, Table, Flex, Heading, Text, Button, Icon } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiTrash2, FiCalendar, FiUsers, FiCheckCircle, FiClock } from 'react-icons/fi';
import { StatCard } from '../components/dashboard/StatCard';
import { Badge } from '../components/common/Badge';
import { sampleAppointments } from '../data/sampleData';

export const OverviewPage = () => {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const today = new Date();
    const greeting = 
        today.getHours() < 12 
            ? 'Bonjour' 
            : today.getHours() < 18 
            ? 'Bon après-midi' 
            : 'Bonsoir';

    return (
        <Box>
            <Box 
                mb="2rem" 
                p="1.5rem" 
                bg="linear-gradient(135deg, rgba(10, 77, 104, 0.05) 0%, rgba(5, 199, 226, 0.05) 100%)"
                borderRadius="12px"
                border="1px solid rgba(10, 77, 104, 0.1)"
            >
                <Heading
                    as="h1"
                    fontFamily="'Crimson Pro', serif"
                    fontSize="2rem"
                    color="primary"
                    mb="0.5rem"
                    fontWeight="700"
                >
                    {greeting}, Dr. Martin 👋
                </Heading>
                <Text 
                    fontSize="0.95rem" 
                    color="rgba(10, 77, 104, 0.7)"
                    fontWeight="500"
                >
                    Voici un aperçu de votre activité aujourd'hui
                </Text>
            </Box>
            <Grid
                templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
                gap="1.25rem"
                mb="2rem"
            >
                <StatCard
                    title="Rendez-vous aujourd'hui"
                    value="12"
                    icon={<Icon as={FiCalendar} />}
                    change="+3 depuis hier"
                    variant="primary"
                />
                <StatCard
                    title="Patients actifs"
                    value="342"
                    icon={<Icon as={FiUsers} />}
                    change="+15 ce mois"
                    variant="accent"
                />
                <StatCard
                    title="Taux de présence"
                    value="94%"
                    icon={<Icon as={FiCheckCircle} />}
                    change="+2% ce mois"
                    variant="success"
                />
                <StatCard
                    title="En attente"
                    value="8"
                    icon={<Icon as={FiClock} />}
                    change="Confirmations requises"
                    variant="warning"
                />
            </Grid>
            <Box
                bg="white"
                borderRadius="12px"
                p="1.5rem"
                boxShadow="0 2px 12px rgba(10, 77, 104, 0.08)"
                border="1px solid rgba(10, 77, 104, 0.08)"
            >
                <Flex justify="space-between" align="center" mb="1.5rem">
                    <Box>
                        <Heading
                            as="h2"
                            fontFamily="'Crimson Pro', serif"
                            fontSize="1.5rem"
                            color="primary"
                            mb="0.25rem"
                            fontWeight="700"
                        >
                            Rendez-vous récents
                        </Heading>
                        <Text 
                            fontSize="0.85rem" 
                            color="rgba(10, 77, 104, 0.6)"
                            fontWeight="500"
                        >
                            {sampleAppointments.length} rendez-vous au total
                        </Text>
                    </Box>
                    <Button
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
                        + Nouveau RDV
                    </Button>
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
                            {sampleAppointments.slice(0, 5).map((appointment, index) => (
                                <Table.Row
                                    key={appointment.id}
                                    _hover={{ 
                                        bg: 'rgba(5, 199, 226, 0.04)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    borderBottom={
                                        index === 4 
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
                                        {appointment.patient}
                                    </Table.Cell>
                                    <Table.Cell 
                                        py="1rem" 
                                        px="1.25rem"
                                        color="rgba(10, 77, 104, 0.8)"
                                        fontSize="0.9rem"
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
                                                title="Annuler"
                                            >
                                                <Icon as={FiTrash2} boxSize="1.05rem" />
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
            </Box>
        </Box>
    );
};
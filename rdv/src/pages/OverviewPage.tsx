import { Box, Grid, Table } from '@chakra-ui/react';
import { StatCard } from '../components/dashboard/StatCard';
import { DataTable } from '../components/dashboard/DataTable';
import { Badge } from '../components/common/Badge';
import { sampleAppointments } from '../data/sampleData';

export const OverviewPage = () => {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <Box>
            <Grid
                templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
                gap="1.5rem"
                mb="2rem"
            >
                <StatCard
                    title="Rendez-vous aujourd'hui"
                    value="12"
                    icon="📅"
                    change="+3 depuis hier"
                    variant="primary"
                />
                <StatCard
                    title="Patients actifs"
                    value="342"
                    icon="👥"
                    change="+15 ce mois"
                    variant="accent"
                />
                <StatCard
                    title="Taux de présence"
                    value="94%"
                    icon="✅"
                    change="+2% ce mois"
                    variant="success"
                />
                <StatCard
                    title="En attente"
                    value="8"
                    icon="⏳"
                    change="Confirmations requises"
                    variant="warning"
                />
            </Grid>

            <DataTable title="Rendez-vous récents">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Patient</Table.ColumnHeader>
                        <Table.ColumnHeader>Service</Table.ColumnHeader>
                        <Table.ColumnHeader>Date & Heure</Table.ColumnHeader>
                        <Table.ColumnHeader>Statut</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {sampleAppointments.slice(0, 5).map((appointment) => (
                        <Table.Row
                            key={appointment.id}
                            _hover={{ bg: 'var(--bg-light)' }}
                        >
                            <Table.Cell>{appointment.patient}</Table.Cell>
                            <Table.Cell>{appointment.service}</Table.Cell>
                            <Table.Cell>
                                {formatDate(appointment.date)} à {appointment.time}
                            </Table.Cell>
                            <Table.Cell>
                                <Badge status={appointment.status}>{appointment.status}</Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <Box display="flex" gap="0.5rem">
                                    <Box
                                        as="button"
                                        bg="none"
                                        border="none"
                                        cursor="pointer"
                                        fontSize="1.2rem"
                                        p="0.5rem"
                                        borderRadius="6px"
                                        transition="all 0.3s"
                                        color="primary"
                                        _hover={{ bg: 'var(--bg-light)' }}
                                        title="Modifier"
                                    >
                                        ✏️
                                    </Box>
                                    <Box
                                        as="button"
                                        bg="none"
                                        border="none"
                                        cursor="pointer"
                                        fontSize="1.2rem"
                                        p="0.5rem"
                                        borderRadius="6px"
                                        transition="all 0.3s"
                                        color="danger"
                                        _hover={{ bg: 'var(--bg-light)' }}
                                        title="Annuler"
                                    >
                                        🗑️
                                    </Box>
                                </Box>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </DataTable>
        </Box>
    );
};

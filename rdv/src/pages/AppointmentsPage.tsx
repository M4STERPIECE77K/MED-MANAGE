import { Box, Table, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { DataTable } from '../components/dashboard/DataTable';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { sampleAppointments } from '../data/sampleData';
import type { Appointment } from '../types';

export const AppointmentsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>(sampleAppointments);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const handleSearch = (value: string) => {
        const filtered = sampleAppointments.filter(
            (app) =>
                app.patient.toLowerCase().includes(value.toLowerCase()) ||
                app.email.toLowerCase().includes(value.toLowerCase()) ||
                app.service.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredAppointments(filtered);
    };

    return (
        <Box>
            <DataTable
                title="Tous les rendez-vous"
                onAdd={() => setIsModalOpen(true)}
                addButtonText="Nouveau rendez-vous"
                searchPlaceholder="Rechercher un patient, une date..."
                onSearch={handleSearch}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Patient</Table.ColumnHeader>
                        <Table.ColumnHeader>Contact</Table.ColumnHeader>
                        <Table.ColumnHeader>Service</Table.ColumnHeader>
                        <Table.ColumnHeader>Date & Heure</Table.ColumnHeader>
                        <Table.ColumnHeader>Statut</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {filteredAppointments.map((appointment) => (
                        <Table.Row
                            key={appointment.id}
                            _hover={{ bg: 'var(--bg-light)' }}
                        >
                            <Table.Cell>#{appointment.id}</Table.Cell>
                            <Table.Cell>{appointment.patient}</Table.Cell>
                            <Table.Cell>
                                {appointment.email}
                                <br />
                                <Text as="small" fontSize="0.85rem" color="textGray">
                                    {appointment.phone}
                                </Text>
                            </Table.Cell>
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

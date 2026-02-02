import { Box, Table } from '@chakra-ui/react';
import { useState } from 'react';
import { DataTable } from '../components/dashboard/DataTable';
import { Modal } from '../components/common/Modal';
import { samplePatients } from '../data/sampleData';
import type { Patient } from '../types';

export const PatientsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<Patient[]>(samplePatients);

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    const handleSearch = (value: string) => {
        const filtered = samplePatients.filter(
            (patient) =>
                patient.name.toLowerCase().includes(value.toLowerCase()) ||
                patient.email.toLowerCase().includes(value.toLowerCase()) ||
                patient.phone.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredPatients(filtered);
    };

    return (
        <Box>
            <DataTable
                title="Liste des patients"
                onAdd={() => setIsModalOpen(true)}
                addButtonText="Nouveau patient"
                searchPlaceholder="Rechercher un patient..."
                onSearch={handleSearch}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>ID</Table.ColumnHeader>
                        <Table.ColumnHeader>Nom complet</Table.ColumnHeader>
                        <Table.ColumnHeader>Email</Table.ColumnHeader>
                        <Table.ColumnHeader>Téléphone</Table.ColumnHeader>
                        <Table.ColumnHeader>Dernière visite</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {filteredPatients.map((patient) => (
                        <Table.Row
                            key={patient.id}
                            _hover={{ bg: 'var(--bg-light)' }}
                        >
                            <Table.Cell>#{patient.id}</Table.Cell>
                            <Table.Cell>{patient.name}</Table.Cell>
                            <Table.Cell>{patient.email}</Table.Cell>
                            <Table.Cell>{patient.phone}</Table.Cell>
                            <Table.Cell>{formatDate(patient.lastVisit)}</Table.Cell>
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
                                        title="Supprimer"
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
                title="Nouveau patient"
            >
                <Box>Formulaire de création de patient à implémenter</Box>
            </Modal>
        </Box>
    );
};

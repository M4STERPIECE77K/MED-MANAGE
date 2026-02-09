import { Box, Table, Icon } from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { DataTable } from '../components/dashboard/DataTable';
import { Badge } from '../components/common/Badge';
import { services } from '../data/sampleData';

export const ServicesPage = () => {
    return (
        <Box>
            <DataTable
                title="Services disponibles"
                onAdd={() => alert('Ajouter un nouveau service')}
                addButtonText="Nouveau service"
            >
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Service</Table.ColumnHeader>
                        <Table.ColumnHeader>Durée</Table.ColumnHeader>
                        <Table.ColumnHeader>Prix</Table.ColumnHeader>
                        <Table.ColumnHeader>Statut</Table.ColumnHeader>
                        <Table.ColumnHeader>Actions</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {services.map((service) => (
                        <Table.Row
                            key={service.id}
                            _hover={{ bg: 'var(--bg-light)' }}
                        >
                            <Table.Cell>{service.name}</Table.Cell>
                            <Table.Cell>{service.duration}</Table.Cell>
                            <Table.Cell>{service.price}</Table.Cell>
                            <Table.Cell>
                                <Badge status={service.status || 'Actif'}>
                                    {service.status || 'Actif'}
                                </Badge>
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
                                        <Icon as={FiEdit2} boxSize="1.1rem" />
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
                                        <Icon as={FiTrash2} boxSize="1.1rem" />
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

import { Box, Button, Grid, Heading, Input, Textarea, chakra } from '@chakra-ui/react';
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { BookingFormData } from '../../types';

export const BookingForm = () => {
    const [formData, setFormData] = useState<BookingFormData>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        service: '',
        notes: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert(
            '✅ Votre rendez-vous a été enregistré avec succès!\n\nVous recevrez une confirmation par email.'
        );
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            date: '',
            time: '',
            service: '',
            notes: '',
        });
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <Box
            bg="white"
            borderRadius="16px"
            p="2.5rem"
            boxShadow="0 10px 30px rgba(10, 77, 104, 0.15)"
            color="textDark"
            css={{
                animation: 'fadeInUp 0.8s ease-out 0.3s backwards',
            }}
        >
            <Heading
                as="h2"
                fontFamily="'Crimson Pro', serif"
                color="primary"
                fontSize="2rem"
                mb="1.5rem"
            >
                Réserver un rendez-vous
            </Heading>

            <form onSubmit={handleSubmit}>
                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="1rem" mb="1.5rem">
                    <Box>
                        <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                            Prénom
                        </Box>
                        <Input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            w="100%"
                            p="0.9rem"
                            border="2px solid var(--border)"
                            borderRadius="8px"
                            fontSize="1rem"
                            transition="all 0.3s"
                            _focus={{
                                outline: 'none',
                                borderColor: 'accent',
                                boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                            }}
                        />
                    </Box>
                    <Box>
                        <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                            Nom
                        </Box>
                        <Input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            w="100%"
                            p="0.9rem"
                            border="2px solid var(--border)"
                            borderRadius="8px"
                            fontSize="1rem"
                            transition="all 0.3s"
                            _focus={{
                                outline: 'none',
                                borderColor: 'accent',
                                boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                            }}
                        />
                    </Box>
                </Grid>

                <Box mb="1.5rem">
                    <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                        Email
                    </Box>
                    <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        w="100%"
                        p="0.9rem"
                        border="2px solid var(--border)"
                        borderRadius="8px"
                        fontSize="1rem"
                        transition="all 0.3s"
                        _focus={{
                            outline: 'none',
                            borderColor: 'accent',
                            boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                        }}
                    />
                </Box>

                <Box mb="1.5rem">
                    <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                        Téléphone
                    </Box>
                    <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        w="100%"
                        p="0.9rem"
                        border="2px solid var(--border)"
                        borderRadius="8px"
                        fontSize="1rem"
                        transition="all 0.3s"
                        _focus={{
                            outline: 'none',
                            borderColor: 'accent',
                            boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                        }}
                    />
                </Box>

                <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap="1rem" mb="1.5rem">
                    <Box>
                        <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                            Date
                        </Box>
                        <Input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={today}
                            required
                            w="100%"
                            p="0.9rem"
                            border="2px solid var(--border)"
                            borderRadius="8px"
                            fontSize="1rem"
                            transition="all 0.3s"
                            _focus={{
                                outline: 'none',
                                borderColor: 'accent',
                                boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                            }}
                        />
                    </Box>
                    <Box>
                        <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                            Heure
                        </Box>
                        <Input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            required
                            w="100%"
                            p="0.9rem"
                            border="2px solid var(--border)"
                            borderRadius="8px"
                            fontSize="1rem"
                            transition="all 0.3s"
                            _focus={{
                                outline: 'none',
                                borderColor: 'accent',
                                boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                            }}
                        />
                    </Box>
                </Grid>

                <Box mb="1.5rem">
                    <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                        Type de soin
                    </Box>
                    <chakra.select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        color={formData.service ? "textDark" : "gray.500"}
                        w="100%"
                        p="0.9rem"
                        border="2px solid var(--border)"
                        borderRadius="8px"
                        fontSize="1rem"
                        transition="all 0.3s"
                        _focus={{
                            outline: 'none',
                            borderColor: 'accent',
                            boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                        }}
                        css={{
                            appearance: 'auto',
                            backgroundColor: 'white',
                        }}
                    >
                        <option value="" disabled style={{ color: '#a0a0a0' }}>
                            Sélectionnez un service
                        </option>
                        <option value="consultation">Consultation générale</option>
                        <option value="detartrage">Détartrage</option>
                        <option value="blanchiment">Blanchiment</option>
                        <option value="implant">Implant dentaire</option>
                        <option value="orthodontie">Orthodontie</option>
                        <option value="urgence">Urgence</option>
                    </chakra.select>
                </Box>

                <Box mb="1.5rem">
                    <Box as="label" display="block" color="textDark" fontWeight="600" mb="0.5rem" fontSize="0.95rem">
                        Notes (optionnel)
                    </Box>
                    <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        color="textDark"
                        rows={3}
                        w="100%"
                        p="0.9rem"
                        border="2px solid var(--border)"
                        borderRadius="8px"
                        fontSize="1rem"
                        transition="all 0.3s"
                        _focus={{
                            outline: 'none',
                            borderColor: 'accent',
                            boxShadow: '0 0 0 3px rgba(5, 199, 226, 0.1)',
                        }}
                    />
                </Box>

                <Button
                    type="submit"
                    bg="primary"
                    color="white"
                    p="1rem 2rem"
                    border="none"
                    borderRadius="8px"
                    fontSize="1.1rem"
                    fontWeight="600"
                    cursor="pointer"
                    w="100%"
                    transition="all 0.3s"
                    boxShadow="0 1px 3px rgba(10, 77, 104, 0.08)"
                    _hover={{
                        bg: 'primaryDark',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(10, 77, 104, 0.12)',
                    }}
                >
                    Confirmer le rendez-vous
                </Button>
            </form>
        </Box>
    );
};

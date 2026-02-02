import { Box, Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { sampleAppointments } from '../data/sampleData';

export const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(0); // January
    const [currentYear, setCurrentYear] = useState(2026);

    const monthNames = [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
    ];

    const dayNames = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

    const changeMonth = (delta: number) => {
        let newMonth = currentMonth + delta;
        let newYear = currentYear;

        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        } else if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    const generateCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const days = [];

        // Day headers
        dayNames.forEach((day) => {
            days.push(
                <Box
                    key={`header-${day}`}
                    textAlign="center"
                    fontWeight="600"
                    p="0.5rem"
                >
                    {day}
                </Box>
            );
        });

        // Empty cells before first day
        for (let i = 0; i < firstDay; i++) {
            days.push(<Box key={`empty-${i}`} />);
        }

        // Days
        for (let day = 1; day <= daysInMonth; day++) {
            const hasAppointment = sampleAppointments.some((app) => {
                const appDate = new Date(app.date);
                return (
                    appDate.getDate() === day &&
                    appDate.getMonth() === currentMonth &&
                    appDate.getFullYear() === currentYear
                );
            });

            days.push(
                <Box
                    key={`day-${day}`}
                    aspectRatio="1"
                    border="2px solid var(--border)"
                    borderRadius="8px"
                    p="0.5rem"
                    textAlign="center"
                    cursor="pointer"
                    transition="all 0.3s"
                    bg={hasAppointment ? 'rgba(5, 199, 226, 0.1)' : 'transparent'}
                    borderColor={hasAppointment ? 'accent' : 'border'}
                    _hover={{
                        borderColor: 'accent',
                        bg: 'accentSoft',
                    }}
                >
                    <Box fontWeight="600">{day}</Box>
                    {hasAppointment && (
                        <Text fontSize="0.75rem" color="accent">
                            ● RDV
                        </Text>
                    )}
                </Box>
            );
        }

        return days;
    };

    return (
        <Box bg="white" borderRadius="12px" p="2rem" boxShadow="0 1px 3px rgba(10, 77, 104, 0.08)">
            <Flex justify="space-between" align="center" mb="2rem">
                <Heading
                    as="h2"
                    fontFamily="'Crimson Pro', serif"
                    fontSize="1.8rem"
                    color="primary"
                >
                    {monthNames[currentMonth]} {currentYear}
                </Heading>
                <Flex gap="1rem">
                    <Button
                        onClick={() => changeMonth(-1)}
                        bg="primary"
                        color="white"
                        border="none"
                        px="1rem"
                        py="0.6rem"
                        borderRadius="6px"
                        cursor="pointer"
                        fontWeight="600"
                    >
                        ← Précédent
                    </Button>
                    <Button
                        onClick={() => changeMonth(1)}
                        bg="primary"
                        color="white"
                        border="none"
                        px="1rem"
                        py="0.6rem"
                        borderRadius="6px"
                        cursor="pointer"
                        fontWeight="600"
                    >
                        Suivant →
                    </Button>
                </Flex>
            </Flex>

            <Grid templateColumns="repeat(7, 1fr)" gap="1rem">
                {generateCalendar()}
            </Grid>
        </Box>
    );
};

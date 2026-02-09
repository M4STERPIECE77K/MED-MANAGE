import { Box, Button, Flex, Grid, Heading, Text, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import { sampleAppointments } from '../data/sampleData';

export const CalendarPage = () => {
    const [currentMonth, setCurrentMonth] = useState(0);
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

    const isToday = (day: number) => {
        const today = new Date();
        return (
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear()
        );
    };

    const generateCalendar = () => {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        const days = [];

        dayNames.forEach((day) => {
            days.push(
                <Box
                    key={`header-${day}`}
                    textAlign="center"
                    fontWeight="700"
                    fontSize="0.65rem"
                    p="0.35rem"
                    color="primary"
                    letterSpacing="0.5px"
                    textTransform="uppercase"
                >
                    {day}
                </Box>
            );
        });
        for (let i = 0; i < firstDay; i++) {
            days.push(<Box key={`empty-${i}`} />);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            const hasAppointment = sampleAppointments.some((app) => {
                const appDate = new Date(app.date);
                return (
                    appDate.getDate() === day &&
                    appDate.getMonth() === currentMonth &&
                    appDate.getFullYear() === currentYear
                );
            });

            const appointmentCount = sampleAppointments.filter((app) => {
                const appDate = new Date(app.date);
                return (
                    appDate.getDate() === day &&
                    appDate.getMonth() === currentMonth &&
                    appDate.getFullYear() === currentYear
                );
            }).length;

            const todayCheck = isToday(day);

            days.push(
                <Box
                    key={`day-${day}`}
                    position="relative"
                    aspectRatio="1.25"
                    border="2px solid"
                    borderColor={todayCheck ? 'accent' : hasAppointment ? 'rgba(5, 199, 226, 0.3)' : 'rgba(10, 77, 104, 0.1)'}
                    borderRadius="8px"
                    p="0.35rem"
                    textAlign="center"
                    cursor="pointer"
                    transition="all 0.3s ease"
                    bg={
                        todayCheck
                            ? 'linear-gradient(135deg, rgba(5, 199, 226, 0.15) 0%, rgba(5, 199, 226, 0.05) 100%)'
                            : hasAppointment
                            ? 'linear-gradient(135deg, rgba(5, 199, 226, 0.08) 0%, rgba(5, 199, 226, 0.02) 100%)'
                            : 'transparent'
                    }
                    _hover={{
                        borderColor: 'accent',
                        bg: 'linear-gradient(135deg, rgba(5, 199, 226, 0.15) 0%, rgba(5, 199, 226, 0.08) 100%)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 12px rgba(5, 199, 226, 0.2)',
                    }}
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    {todayCheck && (
                        <Badge
                            position="absolute"
                            top="-8px"
                            right="-8px"
                            bg="accent"
                            color="white"
                            borderRadius="full"
                            fontSize="0.65rem"
                            px="0.5rem"
                            py="0.15rem"
                            fontWeight="700"
                        >
                            Aujourd'hui
                        </Badge>
                    )}
                    <Box 
                        fontWeight={todayCheck ? "800" : "600"} 
                        fontSize="0.8rem"
                        color={todayCheck ? 'accent' : 'primary'}
                    >
                        {day}
                    </Box>
                    {hasAppointment && (
                        <Flex
                            align="center"
                            gap="0.25rem"
                            mt="0.5rem"
                        >
                            <Box
                                w="6px"
                                h="6px"
                                borderRadius="full"
                                bg="accent"
                            />
                            <Text 
                                fontSize="0.55rem" 
                                color="accent"
                                fontWeight="600"
                            >
                                {appointmentCount} RDV
                            </Text>
                        </Flex>
                    )}
                </Box>
            );
        }

        return days;
    };

    return (
        <Box 
            bg="white" 
            borderRadius="12px" 
            p="1rem" 
            boxShadow="0 4px 20px rgba(10, 77, 104, 0.08)"
            border="1px solid rgba(10, 77, 104, 0.08)"
            w="100%"
        >
            <Flex 
                justify="space-between" 
                align="center" 
                mb="1rem"
                pb="0.75rem"
                borderBottom="2px solid rgba(10, 77, 104, 0.08)"
            >
                <Box>
                    <Heading
                        as="h2"
                        fontFamily="'Crimson Pro', serif"
                        fontSize="1.4rem"
                        color="primary"
                        mb="0.25rem"
                        fontWeight="700"
                    >
                        {monthNames[currentMonth]} {currentYear}
                    </Heading>
                    <Text 
                        fontSize="0.75rem" 
                        color="rgba(10, 77, 104, 0.6)"
                        fontWeight="500"
                    >
                        Gérez vos rendez-vous
                    </Text>
                </Box>
                <Flex gap="0.4rem">
                    <Button
                        onClick={() => changeMonth(-1)}
                        bg="white"
                        color="primary"
                        border="2px solid"
                        borderColor="primary"
                        px="0.75rem"
                        py="0.35rem"
                        borderRadius="8px"
                        cursor="pointer"
                        fontWeight="600"
                        fontSize="0.8rem"
                        transition="all 0.3s ease"
                        _hover={{
                            bg: 'primary',
                            color: 'white',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(10, 77, 104, 0.2)',
                        }}
                    >
                        ← Précédent
                    </Button>
                    <Button
                        onClick={() => changeMonth(1)}
                        bg="primary"
                        color="white"
                        border="2px solid transparent"
                        px="0.75rem"
                        py="0.35rem"
                        borderRadius="8px"
                        cursor="pointer"
                        fontWeight="600"
                        fontSize="0.8rem"
                        transition="all 0.3s ease"
                        _hover={{
                            bg: 'rgba(10, 77, 104, 0.9)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 12px rgba(10, 77, 104, 0.3)',
                        }}
                    >
                        Suivant →
                    </Button>
                </Flex>
            </Flex>

            <Grid 
                templateColumns="repeat(7, 1fr)" 
                gap="0.35rem"
                position="relative"
            >
                {generateCalendar()}
            </Grid>
        </Box>
    );
};
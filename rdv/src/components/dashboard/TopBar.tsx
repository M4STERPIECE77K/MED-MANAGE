import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
    title: string;
    onMenuToggle?: () => void;
}

export const TopBar = ({ title, onMenuToggle }: TopBarProps) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <Box
            bg="white"
            px="2rem"
            py="1.5rem"
            boxShadow="0 1px 3px rgba(10, 77, 104, 0.08)"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            position="sticky"
            top="0"
            zIndex="100"
        >
            <Flex align="center" gap="1rem">
                <Button
                    onClick={onMenuToggle}
                    display={{ base: 'block', lg: 'none' }}
                    bg="primary"
                    color="white"
                    border="none"
                    p="0.8rem"
                    borderRadius="8px"
                    cursor="pointer"
                    fontSize="1.5rem"
                    minW="auto"
                    h="auto"
                >
                    ☰
                </Button>
                <Heading
                    as="h1"
                    fontFamily="'Crimson Pro', serif"
                    fontSize="1.8rem"
                    color="primary"
                >
                    {title}
                </Heading>
            </Flex>

            <Flex align="center" gap="1rem">
                <Flex
                    w="45px"
                    h="45px"
                    bg="linear-gradient(135deg, var(--primary), var(--accent))"
                    borderRadius="50%"
                    align="center"
                    justify="center"
                    color="white"
                    fontWeight="600"
                >
                    Dr
                </Flex>
                <Box display={{ base: 'none', md: 'block' }}>Dr. Martin</Box>
                <Button
                    onClick={handleLogout}
                    bg="danger"
                    color="white"
                    px="1.2rem"
                    py="0.6rem"
                    border="none"
                    borderRadius="6px"
                    cursor="pointer"
                    fontWeight="500"
                    transition="all 0.3s"
                    _hover={{
                        bg: '#dc2626',
                        transform: 'translateY(-2px)',
                    }}
                >
                    Déconnexion
                </Button>
            </Flex>
        </Box>
    );
};

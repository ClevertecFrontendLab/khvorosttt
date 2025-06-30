import './App.css';

import { Box, Grid, GridItem, Hide, Show } from '@chakra-ui/react';
import { useState } from 'react';
import { Outlet } from 'react-router';

import { BurgerMenu } from '~/components/BurgerMenu/BurgerMenu';
import { Header } from '~/components/Header/header';
import { Footer } from '~/components/MTFooter/MTFooter';
import { Navbar } from '~/components/Navbar/Navbar';
import { NotificationAside } from '~/components/NotificationAside/NotificationAside';

function App() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <Box display='flex' flexDirection='column' overflow={isOpen ? 'hidden' : 'auto'} h='100%'>
            <Header isOpen={isOpen} toggleMenu={toggleMenu} />
            <Show below='xl'>
                <BurgerMenu isOpen={isOpen} toggleMenu={toggleMenu} data-test-id='nav' />
            </Show>
            <Hide below='xl'>
                <Navbar />
            </Hide>
            <Box p={{ base: '0px', xl: '0px 260px' }}>
                <Grid
                    templateColumns={{
                        base: 'repeat(4, 1fr)',
                        lg: 'repeat(12, 1fr)',
                    }}
                    gap='24px'
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                    }}
                >
                    <GridItem colSpan={12} style={{ overflowY: 'auto', height: '100%' }}>
                        <Outlet />
                    </GridItem>
                    <Hide below='xl'>
                        <NotificationAside />
                    </Hide>
                </Grid>
            </Box>
            <Box display={{ base: 'block', lg: 'none' }}>
                <Footer />
            </Box>
        </Box>
    );
}

export default App;

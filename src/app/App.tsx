import './App.css';

import { Box, Flex, Grid, GridItem, Hide, Show } from '@chakra-ui/react';
import { Outlet } from 'react-router';

import { Header } from '~/components/Header/header';
import { Footer } from '~/components/MTFooter/MTFooter';
import { Navbar } from '~/components/Navbar/Navbar';
import { NotificationAside } from '~/components/NotificationAside/NotificationAside';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Header />
                <Flex w='100%' align='center' justify='space-between'>
                    <Hide below='xl'>
                        <Navbar />
                    </Hide>
                </Flex>
                <Box p={{ base: '0px', xl: '0px 280px' }}>
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
                <Show below='lg'>
                    <Footer />
                </Show>
            </div>
        </>
    );
}

export default App;

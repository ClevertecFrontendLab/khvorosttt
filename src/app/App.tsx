import './App.css';

import { Grid, GridItem, Hide, Show } from '@chakra-ui/react';
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
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Header />
                <Grid
                    templateColumns={{
                        base: 'repeat(4, 1fr)',
                        lg: 'repeat(12, 1fr)',
                        xl: 'repeat(17, 1fr)',
                    }}
                    gap='24px'
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                    }}
                >
                    <Hide below='xl'>
                        <GridItem colSpan={3}>
                            <Navbar />
                        </GridItem>
                    </Hide>
                    <GridItem colSpan={12} style={{ overflowY: 'auto', height: '100%' }}>
                        <Outlet />
                    </GridItem>
                    <Hide below='xl'>
                        <NotificationAside />
                    </Hide>
                </Grid>
                <Show below='lg'>
                    <Footer />
                </Show>
            </div>
        </>
    );
}

export default App;

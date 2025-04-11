import './App.css';

import { Show } from '@chakra-ui/react';

import { Header } from '~/components/Header/header';
import { Footer } from '~/components/MTFooter/MTFooter';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <div>
                <Header />
                <Show below='lg'>
                    <Footer />
                </Show>
            </div>
        </>
    );
}

export default App;

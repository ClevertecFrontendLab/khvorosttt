import './App.css';

//import { useState } from 'react';
//import reactLogo from '~/assets/react.svg';
import { Header } from '~/components/Header/header';
import { useGetPostsQuery } from '~/query/services/posts.ts';

function App() {
    //const [count, setCount] = useState(0);
    const { data: _data, isLoading: _isLoading } = useGetPostsQuery();

    return (
        <>
            <div>
                <Header />
            </div>
        </>
    );
}

export default App;

import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router';

import { store } from '~/store/configure-store.ts';

import { CategoryContextProvider } from './components/CategoryContext/CategoryContextProvider';
import { Notification } from './components/Notification/Notification';
import router from './components/Router/router';
import theme from './styles/theme';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <ChakraProvider theme={theme}>
                <CategoryContextProvider>
                    <Notification />
                    <RouterProvider router={router} />
                </CategoryContextProvider>
            </ChakraProvider>
        </Provider>
    </StrictMode>,
);

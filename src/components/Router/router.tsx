import { createBrowserRouter, Navigate } from 'react-router';

import App from '~/app/App';
import { Auth } from '~/pages/Auth/Auth';
import { Login } from '~/pages/Auth/Login/Login';
import { SignUp } from '~/pages/Auth/SignUp/SignUp';
import { ErrorPage } from '~/pages/Error/Error';
import { Home } from '~/pages/Home/Home';
import { JuiciestPage } from '~/pages/Juiciest/Juiciest';
import { Recipe } from '~/pages/Recipe/Recipe';
import { Vegan } from '~/pages/Vegan/Vegan';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'the-juiciest',
                element: <JuiciestPage />,
            },
            {
                path: 'the-juiciest/:id',
                element: <Recipe />,
            },
            {
                path: ':categoryId',
                element: <Vegan />,
            },
            {
                path: ':categoryId/:subcategoryId',
                element: <Vegan />,
            },
            {
                path: ':categoryId/:subcategoryId/:id',
                element: <Recipe />,
            },
            {
                path: 'not-found',
                element: <ErrorPage />,
            },
            {
                path: '*',
                element: <Navigate to='/not-found' />,
            },
        ],
    },
    {
        path: '/auth',
        element: <Auth />,
        children: [
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'signup',
                element: <SignUp />,
            },
        ],
    },
]);

export default router;

import { createBrowserRouter, Navigate } from 'react-router';

import App from '~/app/App';
import { Auth } from '~/pages/Auth/Auth';
import { Login } from '~/pages/Auth/Login/Login';
import { SignUp } from '~/pages/Auth/SignUp/SignUp';
import { Blogger } from '~/pages/Blogger/Blogger';
import { Bloggers } from '~/pages/Bloggers/Bloggers';
import { ErrorPage } from '~/pages/Error/Error';
import { Home } from '~/pages/Home/Home';
import { JuiciestPage } from '~/pages/Juiciest/Juiciest';
import { EditRecipe } from '~/pages/NewRecipe/EditRecipe';
import { NewRecipe } from '~/pages/NewRecipe/NewRecipe';
import { Profile } from '~/pages/Profile/Profile';
import { Settings } from '~/pages/Profile/Settings/Settings';
import { Recipe } from '~/pages/Recipe/Recipe';
import { Vegan } from '~/pages/Vegan/Vegan';
import { Verification } from '~/pages/Verification/Verification';

import { AuthRoute } from './components/AuthRoute';
import { PrivateRoute } from './components/PrivateRoute';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <PrivateRoute>
                <App />
            </PrivateRoute>
        ),
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
            {
                path: 'new-recipe',
                element: <NewRecipe />,
            },
            {
                path: 'edit-recipe/*',
                element: <EditRecipe />,
            },
            {
                path: 'edit-draft/*',
                element: <EditRecipe />,
            },
            {
                path: 'blogs',
                element: <Bloggers />,
            },
            {
                path: 'blogs/:bloggerId',
                element: <Blogger />,
            },
            {
                path: 'profile',
                element: <Profile />,
            },
            {
                path: 'profile/settings',
                element: <Settings />,
            },
        ],
    },
    {
        path: '/auth',
        element: (
            <AuthRoute>
                <Auth />
            </AuthRoute>
        ),
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
    {
        path: 'verification',
        element: <Verification />,
    },
]);

export default router;

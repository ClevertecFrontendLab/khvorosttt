import { createBrowserRouter } from 'react-router';

import App from '~/app/App';
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
                path: 'the-juiciest',
                element: <JuiciestPage />,
            },
        ],
    },
]);

export default router;

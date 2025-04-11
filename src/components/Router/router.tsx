import { createBrowserRouter } from 'react-router';

import App from '~/app/App';
import { Home } from '~/pages/Home/Home';

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
                path: 'vegan-cuisine',
                element: <></>,
            },
            {
                path: 'juiciest',
                element: <></>,
            },
        ],
    },
]);

export default router;

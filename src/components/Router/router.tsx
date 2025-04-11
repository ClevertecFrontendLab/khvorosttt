import { createBrowserRouter } from 'react-router';

import App from '~/app/App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
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

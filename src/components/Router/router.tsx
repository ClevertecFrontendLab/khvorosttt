import { createBrowserRouter } from 'react-router';

import App from '~/app/App';
import { Home } from '~/pages/Home/Home';
import { JuiciestPage } from '~/pages/Juiciest/Juiciest';
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
                path: 'vegan-cuisine',
                element: <Vegan />,
            },
            {
                path: 'juiciest-link',
                element: <JuiciestPage />,
            },
        ],
    },
]);

export default router;

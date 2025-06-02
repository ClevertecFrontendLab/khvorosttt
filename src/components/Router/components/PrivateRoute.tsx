import { JSX, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useLazyCheckQuery } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';

type Props = {
    children: JSX.Element;
};

export const PrivateRoute = ({ children }: Props) => {
    const navigate = useNavigate();
    const [checkAuth, { isLoading }] = useLazyCheckQuery();
    const justLoggedIn = sessionStorage.getItem('justLoggedIn') === 'true';

    useEffect(() => {
        if (justLoggedIn) {
            sessionStorage.removeItem('justLoggedIn');
        } else {
            checkAuth()
                .unwrap()
                .catch(() => {
                    navigate('/auth/login');
                });
        }
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return children;
};

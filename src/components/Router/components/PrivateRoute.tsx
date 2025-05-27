import { JSX, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { useLazyCheckQuery } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';

type Props = {
    children: JSX.Element;
};

export const PrivateRoute = ({ children }: Props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [checkAuth, { isError, isLoading }] = useLazyCheckQuery();
    const [authChecked, setAuthChecked] = useState(false);

    const justLoggedIn = location.state?.justLoggedIn;

    useEffect(() => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            navigate('/auth/login');
            return;
        }

        if (justLoggedIn) {
            setAuthChecked(true);
            navigate(location.pathname, { replace: true, state: {} });
        } else {
            checkAuth()
                .unwrap()
                .then(() => {
                    setAuthChecked(true);
                })
                .catch(() => {
                    setAuthChecked(true);
                });
        }
    }, [checkAuth, justLoggedIn, location.pathname, navigate]);

    useEffect(() => {
        if (authChecked && isError) {
            navigate('/auth/login');
        }
    }, [authChecked, isError, navigate]);

    if (!authChecked || isLoading) {
        return <Loader />;
    }

    return children;
};

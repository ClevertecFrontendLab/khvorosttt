import { JSX, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useLazyCheckQuery } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';

type Props = {
    children: JSX.Element;
};

export const PrivateRoute = ({ children }: Props) => {
    const navigate = useNavigate();

    const [checkAuth, { isError, isLoading }] = useLazyCheckQuery();
    const [authChecked, setAuthChecked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            checkAuth()
                .unwrap()
                .catch(() => {});
        } else {
            setAuthChecked(true);
            navigate('/auth/login');
        }
    }, [checkAuth, navigate]);

    useEffect(() => {
        if (authChecked && isError) {
            navigate('/auth/login');
        }
    }, [authChecked, isError, navigate]);

    return (
        <>
            {isLoading && <Loader />}
            {children}
        </>
    );
};

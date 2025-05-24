import { JSX } from 'react';
import { Navigate } from 'react-router';

type Props = {
    children: JSX.Element;
};

export const AuthRoute = ({ children }: Props) => {
    const token = localStorage.getItem('access_token');
    return token ? <Navigate to='/' /> : children;
};

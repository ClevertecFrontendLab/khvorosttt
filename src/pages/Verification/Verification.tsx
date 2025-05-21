import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router';

import { setNotification } from '~/services/features/notificationSlice';

export function Verification() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const emailVerified = searchParams.get('emailVerified');
    const dispatch = useDispatch();

    useEffect(() => {
        if (emailVerified === 'true') {
            navigate('/auth/login');
            dispatch(
                setNotification({
                    title: 'Верификация прошла успешно',
                    description: 'Попробуйте немного позже',
                    typeN: 'success',
                }),
            );
        } else {
            navigate('/auth/signup', { state: { verificationError: true } });
        }
    }, [emailVerified, navigate, dispatch]);

    return null;
}

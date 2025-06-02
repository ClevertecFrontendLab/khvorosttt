import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, CloseButton } from '@chakra-ui/react';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearNotification } from '~/services/features/notificationSlice';
import { selectedNotification } from '~/services/features/selectors';

import { CloseButtonStyle, HeadingStyle, NotificationStyle, TextStyle } from './Notification.style';

export function Notification() {
    const { title, description, typeN } = useSelector(selectedNotification);
    const dispatch = useDispatch();

    const closeAction = () => {
        dispatch(clearNotification());
    };

    // useEffect(() => {
    //     if (!title) return;
    //     const timer = setTimeout(() => {
    //         closeAction();
    //     }, 20000);

    //     return () => clearTimeout(timer);
    // }, [title, dispatch]);

    if (!title) {
        return null;
    }

    return (
        <Alert
            status={typeN}
            bg={typeN === 'error' ? '#e53e3e' : '#38a169'}
            sx={NotificationStyle}
            data-test-id='error-notification'
        >
            <AlertIcon color='white' />
            <Box>
                <AlertTitle sx={HeadingStyle}>{title}</AlertTitle>
                <AlertDescription sx={TextStyle}>{description}</AlertDescription>
            </Box>
            <CloseButton
                onClick={closeAction}
                sx={CloseButtonStyle}
                data-test-id='close-alert-button'
            />
        </Alert>
    );
}

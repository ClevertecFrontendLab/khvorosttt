import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { clearNotification } from '~/services/features/notificationSlice';
import { selectedNotification } from '~/services/features/selectors';

import {
    ErrorCloseButtonStyle,
    ErrorHeadingStyle,
    ErrorNotificationStyle,
    ErrorTextStyle,
} from './errorNotification.style';

export function ErrorNotification() {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });
    const { title, description } = useSelector(selectedNotification);
    const dispatch = useDispatch();

    const closeAction = () => {
        dispatch(clearNotification());
        onClose();
    };

    if (!isOpen || !title) {
        return null;
    }
    return (
        <Alert status='error' sx={ErrorNotificationStyle} data-test-id='error-notification'>
            <AlertIcon color='white' />
            <Box>
                <AlertTitle sx={ErrorHeadingStyle}>{title}</AlertTitle>
                <AlertDescription sx={ErrorTextStyle}>{description}</AlertDescription>
            </Box>
            <CloseButton
                onClick={closeAction}
                sx={ErrorCloseButtonStyle}
                data-test-id='close-alert-button'
            />
        </Alert>
    );
}

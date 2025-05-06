import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Box,
    CloseButton,
    useDisclosure,
} from '@chakra-ui/react';

import {
    ErrorCloseButtonStyle,
    ErrorHeadingStyle,
    ErrorNotificationStyle,
    ErrorTextStyle,
} from './errorNotification.style';

export function ErrorNotification() {
    const { isOpen, onClose } = useDisclosure({ defaultIsOpen: true });

    if (!isOpen) {
        return null;
    }
    return (
        <Alert status='error' sx={ErrorNotificationStyle}>
            <AlertIcon color='white' />
            <Box>
                <AlertTitle sx={ErrorHeadingStyle}>Ошибка сервера</AlertTitle>
                <AlertDescription sx={ErrorTextStyle}>Попробуйте немного позже</AlertDescription>
            </Box>
            <CloseButton onClick={onClose} sx={ErrorCloseButtonStyle} />
        </Alert>
    );
}

import {
    HStack,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    PinInput,
    PinInputField,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useVerifyOtpMutation } from '~/api/authApi';
import PINPic from '~/assets/images/PINPic.png';
import { Loader } from '~/components/Loader/Loader';
import { setNotification } from '~/services/features/notificationSlice';

import {
    CloseStyle,
    ContentStyle,
    EmailStyle,
    HeaderStyle,
    HelpStyle,
    TextStyle,
} from '../LastStepModal/LastStepModal.style';

interface PINModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
    restoreAction: () => void;
}

export function PINModal({ isOpen, onClose, email, restoreAction }: PINModalProps) {
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const [pin, setPIN] = useState('');
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handlePIN = () => {
        verifyOtp({ email: email, otpToken: pin })
            .unwrap()
            .then(() => restoreAction())
            .catch((err) => {
                if (err.status === 403) {
                    setError(true);
                    setPIN('');
                } else if (err.status >= 500 && err.status < 600) {
                    setPIN('');
                    dispatch(
                        setNotification({
                            title: 'Ошибка сервера',
                            description: 'Попробуйте немного позже',
                            typeN: 'error',
                        }),
                    );
                }
            });
    };
    const handleChange = (value: string) => {
        setPIN(value);
        setError(false);
    };
    return (
        <>
            {isLoading && <Loader />}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent data-test-id='verification-code-modal' sx={ContentStyle} gap='32px'>
                    <Image src={PINPic} w={{ base: '108px', lg: '206px' }} />
                    <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                    {error ? <ModalHeader sx={HeaderStyle}>Неверный код</ModalHeader> : null}
                    <ModalBody gap='16px'>
                        <Text sx={TextStyle}>
                            Мы отправили вам на e-mail
                            <br />
                            <Text as='span' sx={EmailStyle}>
                                {email}
                            </Text>
                            <br />
                            шестизначный код. Введите его ниже.
                        </Text>
                        <HStack>
                            <PinInput
                                otp
                                value={pin}
                                onChange={handleChange}
                                onComplete={handlePIN}
                                size='md'
                                errorBorderColor='red'
                                isInvalid={error}
                            >
                                {[...Array(6)].map((_, id) => (
                                    <PinInputField
                                        key={id}
                                        data-test-id={`verification-code-input-${id + 1}`}
                                        borderColor={error ? 'red' : 'black'}
                                    />
                                ))}
                            </PinInput>
                        </HStack>
                    </ModalBody>
                    <ModalFooter w='100%'>
                        <Text sx={HelpStyle}>Не пришло письмо? Проверьте папку Спам.</Text>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

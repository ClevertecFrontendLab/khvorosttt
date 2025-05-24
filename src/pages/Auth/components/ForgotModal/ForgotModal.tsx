import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useForgotMutation } from '~/api/authApi';
import notIn from '~/assets/images/Breakfast.png';
import { setNotification } from '~/services/features/notificationSlice';

import { schema } from '../../shema/forgotShema';
import { SignUpInputs } from '../../SignUp/SignUp';
import {
    ButtonStyle,
    CloseStyle,
    ContentStyle,
    HelpStyle,
    InputStyle,
    LabelStyle,
    TextStyle,
} from './ForgotModal.style';

interface ForgotModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPINOpen: () => void;
    setModalEmail: (value: string) => void;
}

export function ForgotModal({ isOpen, onClose, onPINOpen, setModalEmail }: ForgotModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Pick<SignUpInputs, 'email'>>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [forgotPassword] = useForgotMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const handleForgot = (data: Pick<SignUpInputs, 'email'>) => {
        forgotPassword({ email: data.email })
            .unwrap()
            .then(() => {
                setModalEmail(data.email);
                onClose();
                onPINOpen();
            })
            .catch((err) => {
                reset();
                if (err.status === 403) {
                    dispatch(
                        setNotification({
                            title: err.data?.message || 'Такого e-mail нет',
                            description:
                                'Попробуйте другой e-mail или проверьте правильность его написания.',
                            typeN: 'error',
                        }),
                    );
                } else if (err.status >= 500 && err.status < 600) {
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
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='send-email-modal' sx={ContentStyle}>
                <Image src={notIn} w={{ base: '108px', lg: '206px' }} />
                <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                <ModalBody gap='24px'>
                    <Text sx={TextStyle}>
                        Для восстановления входа введите ваш e-mail, куда можно отправить уникальный
                        код
                    </Text>
                    <form onSubmit={handleSubmit(handleForgot)}>
                        <Flex flexDirection='column' gap='24px'>
                            <FormControl isInvalid={!!errors.email} gap='4px'>
                                <FormLabel sx={LabelStyle}>Ваш e-mail</FormLabel>
                                <Input
                                    type='text'
                                    {...register('email')}
                                    placeholder='e-mail'
                                    sx={InputStyle}
                                    data-test-id='email-input'
                                    onBlur={(e) => {
                                        e.target.value = e.target.value.trim();
                                    }}
                                />
                                {errors.email && (
                                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>
                                )}
                            </FormControl>
                            <Button sx={ButtonStyle} data-test-id='submit-button' type='submit'>
                                Получить код
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
                <ModalFooter w='100%'>
                    <Text sx={HelpStyle}>Не пришло письмо? Проверьте папку Спам.</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

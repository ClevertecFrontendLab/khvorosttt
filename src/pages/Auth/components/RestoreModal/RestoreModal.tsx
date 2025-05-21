import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useRestoreMutation } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';
import { setNotification } from '~/services/features/notificationSlice';

import { schema } from '../../shema/restoreShema';
import { SignUpInputs } from '../../SignUp/SignUp';
import { InputStyle } from '../ForgotModal/ForgotModal.style';
import {
    ButtonStyle,
    CloseStyle,
    ContentStyle,
    HeaderStyle,
    LabelStyle,
    ViewStyle,
} from './RestoreModal.style';

interface RestoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

export function RestoreModal({ isOpen, onClose, email }: RestoreModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Omit<SignUpInputs, 'name' | 'surname' | 'email'>>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [restorePassword, { isLoading }] = useRestoreMutation();
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    const handleRestore = (data: Omit<SignUpInputs, 'name' | 'surname' | 'email'>) => {
        restorePassword({
            email: email,
            login: data.login,
            password: data.password,
            passwordConfirm: data.confirmPassword,
        })
            .unwrap()
            .then(() => {
                dispatch(
                    setNotification({
                        title: 'Восстановление данных успешно',
                        description: '',
                        typeN: 'success',
                    }),
                );
                onClose();
            })
            .catch((err) => {
                reset();
                if (err.status >= 500 && err.status < 600) {
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
        <>
            {isLoading && <Loader />}
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent data-test-id='reset-credentials-modal' sx={ContentStyle}>
                    <ModalHeader sx={HeaderStyle}>Упс! Что-то пошло не так</ModalHeader>
                    <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                    <ModalBody>
                        <form onSubmit={handleSubmit(handleRestore)} style={{ gap: '32px' }}>
                            <Flex flexDirection='column' gap='24px'>
                                <FormControl isInvalid={!!errors.login} gap='4px'>
                                    <FormLabel sx={LabelStyle}>Логин для входа на сайт</FormLabel>
                                    <Input
                                        type='text'
                                        {...register('login')}
                                        placeholder='Введите логин'
                                        sx={InputStyle}
                                        data-test-id='login-input'
                                        onBlur={(e) => {
                                            e.target.value = e.target.value.trim();
                                        }}
                                    />
                                    {errors.login && (
                                        <FormErrorMessage>{errors.login.message}</FormErrorMessage>
                                    )}
                                    <FormHelperText>
                                        Логин не менее 5 символов, только латиница
                                    </FormHelperText>
                                </FormControl>
                                <FormControl isInvalid={!!errors.password}>
                                    <FormLabel sx={LabelStyle}>Пароль</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            {...register('password')}
                                            sx={InputStyle}
                                            placeholder='Пароль для сайта'
                                            data-test-id='password-input'
                                        />
                                        <InputRightElement sx={ViewStyle}>
                                            <IconButton
                                                variant='ghost'
                                                size='sm'
                                                icon={showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                                aria-label='Показать пароль'
                                                onMouseDown={() => setShowPassword(true)}
                                                onMouseUp={() => setShowPassword(false)}
                                                onMouseLeave={() => setShowPassword(false)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    {errors.password && (
                                        <FormErrorMessage>
                                            {errors.password.message}
                                        </FormErrorMessage>
                                    )}
                                    <FormHelperText>
                                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                                    </FormHelperText>
                                </FormControl>
                                <FormControl isInvalid={!!errors.confirmPassword}>
                                    <FormLabel sx={LabelStyle}>Повторите пароль</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            {...register('confirmPassword')}
                                            sx={InputStyle}
                                            placeholder='Повторите пароль'
                                            data-test-id='confirm-password-input'
                                        />
                                        <InputRightElement sx={ViewStyle}>
                                            <IconButton
                                                variant='ghost'
                                                size='sm'
                                                icon={
                                                    showConfirmPassword ? (
                                                        <ViewIcon />
                                                    ) : (
                                                        <ViewOffIcon />
                                                    )
                                                }
                                                aria-label='Показать пароль'
                                                onMouseDown={() => setShowConfirmPassword(true)}
                                                onMouseUp={() => setShowConfirmPassword(false)}
                                                onMouseLeave={() => setShowConfirmPassword(false)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    {errors.confirmPassword && (
                                        <FormErrorMessage>
                                            {errors.confirmPassword.message}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                            </Flex>
                            <Button sx={ButtonStyle} data-test-id='submit-button' type='submit'>
                                Зарегистрироваться
                            </Button>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useLoginMutation } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';
import { setNotification } from '~/services/features/notificationSlice';

import { ForgotModal } from '../components/ForgotModal/ForgotModal';
import { PINModal } from '../components/PINModal/PINModal';
import { RepeatModal } from '../components/RepeatModal/RepeatModal';
import { RestoreModal } from '../components/RestoreModal/RestoreModal';
import { schema } from '../shema/loginShema';
import {
    ForgotButtonStyle,
    FormStyle,
    InputStyle,
    LabelStyle,
    SubmitButtonStyle,
    ViewStyle,
} from './login.style';

export type LoginInputs = {
    login: string;
    password: string;
};

export function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loginUser, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isForgotOpen, onOpen: onForgotOpen, onClose: onForgotClose } = useDisclosure();
    const [modalEmail, setModalEmail] = useState('');
    const { isOpen: isPINOpen, onOpen: onPINOpen, onClose: onPINClose } = useDisclosure();
    const [lastFormData, setLastFormData] = useState<LoginInputs | null>(null);
    const navigate = useNavigate();
    const {
        isOpen: isRestoreOpen,
        onOpen: onRestoreOpen,
        onClose: onRestoreClose,
    } = useDisclosure();

    const sendLoginRequest = (data: LoginInputs) => {
        loginUser({ login: data.login, password: data.password })
            .unwrap()
            .then(() => navigate('/'))
            .catch((err) => {
                if (err.status === 401) {
                    dispatch(
                        setNotification({
                            title: err.data?.message || 'Неверный логин или пароль',
                            description: 'Попробуйте снова.',
                            typeN: 'error',
                        }),
                    );
                } else if (err.status === 403) {
                    dispatch(
                        setNotification({
                            title: err.data?.message || 'E-mail не верифицирован',
                            description: 'Проверьте почту и перейдите по ссылке.',
                            typeN: 'error',
                        }),
                    );
                } else if (err.status === 500) {
                    onOpen();
                }
            });
    };

    const handleLogin = (data: LoginInputs) => {
        setLastFormData(data);
        sendLoginRequest(data);
    };

    return (
        <>
            {isLoading && <Loader />}
            <form onSubmit={handleSubmit(handleLogin)} data-test-id='sign-in-form'>
                <Flex sx={FormStyle}>
                    <Flex flexDirection='column' gap='24px'>
                        <FormControl isInvalid={!!errors.login}>
                            <FormLabel sx={LabelStyle}>Логин для входа на сайт</FormLabel>
                            <Input
                                type='text'
                                {...register('login')}
                                onBlur={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                                placeholder='Введите логин'
                                sx={InputStyle}
                                data-test-id='login-input'
                            />
                            {errors.login && (
                                <FormErrorMessage>{errors.login.message}</FormErrorMessage>
                            )}
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
                                        data-test-id='password-visibility-button'
                                    />
                                </InputRightElement>
                            </InputGroup>
                            {errors.password && (
                                <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                            )}
                        </FormControl>
                    </Flex>
                    <Flex gap='16px' flexDirection='column'>
                        <Button
                            type='submit'
                            variant='solid'
                            disabled={!!errors.login || !!errors.password}
                            sx={SubmitButtonStyle}
                            data-test-id='submit-button'
                        >
                            Войти
                        </Button>
                        <Button
                            type='button'
                            variant='unstyled'
                            onClick={onForgotOpen}
                            sx={ForgotButtonStyle}
                            data-test-id='forgot-password'
                        >
                            Забыли логин или пароль?
                        </Button>
                    </Flex>
                    <RepeatModal
                        isOpen={isOpen}
                        onClose={onClose}
                        repeater={lastFormData ? () => sendLoginRequest(lastFormData) : undefined}
                    />
                    <ForgotModal
                        isOpen={isForgotOpen}
                        onClose={onForgotClose}
                        onPINOpen={onPINOpen}
                        setModalEmail={(value) => setModalEmail(value)}
                    />
                </Flex>
                <PINModal
                    onClose={onPINClose}
                    isOpen={isPINOpen}
                    email={modalEmail}
                    restoreAction={onRestoreOpen}
                />
                <RestoreModal isOpen={isRestoreOpen} onClose={onRestoreClose} email={modalEmail} />
            </form>
        </>
    );
}

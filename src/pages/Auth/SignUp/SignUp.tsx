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
    Progress,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';

import { useSignupMutation } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';
import { VerificationModal } from '~/pages/Verification/components/VerificationModal/VerificationModal';
import { setNotification } from '~/services/features/notificationSlice';

import { LastStepModal } from '../components/LastStepModal/LastStepModal';
import { InputStyle, LabelStyle, SubmitButtonStyle, ViewStyle } from '../Login/login.style';
import { schema } from '../shema/signupShema';
import { FormStyle } from './signUp.style';

export type SignUpInputs = {
    name: string;
    surname: string;
    email: string;
    login: string;
    password: string;
    confirmPassword: string;
};

export function SignUp() {
    const {
        register,
        handleSubmit,
        trigger,
        control,
        formState: { errors, dirtyFields },
    } = useForm<SignUpInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [filledCount, setFilledCount] = useState(0);
    const handleNextStep = async () => {
        const valid = await trigger(['name', 'surname', 'email']);
        if (valid) {
            setStep(2);
        }
    };

    const watchedFields = useWatch({
        control,
        name: ['name', 'surname', 'email', 'login', 'password', 'confirmPassword'],
    });
    useEffect(() => {
        const fieldNames: (keyof SignUpInputs)[] = [
            'name',
            'surname',
            'email',
            'login',
            'password',
            'confirmPassword',
        ];

        const validCount = fieldNames.reduce((count, field, index) => {
            const value = watchedFields?.[index];
            const isTouched = dirtyFields[field];
            const hasError = !!errors[field];

            return isTouched && !hasError && value?.trim?.() ? count + 1 : count;
        }, 0);

        setFilledCount(validCount);
    }, [watchedFields, dirtyFields, errors]);

    const totalFields = 6;
    const progress = (filledCount / totalFields) * 100;
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [signUpUser, { isLoading }] = useSignupMutation();
    const dispatch = useDispatch();
    const {
        isOpen: isLastStepOpen,
        onOpen: onLastStepOpen,
        onClose: onLastStepClose,
    } = useDisclosure();
    const [email, setEmail] = useState('');
    const location = useLocation();
    const verificationError = location.state?.verificationError;
    const {
        isOpen: isVerificationOpen,
        onOpen: onVerificationOpen,
        onClose: onVerificationClose,
    } = useDisclosure();

    useEffect(() => {
        if (verificationError) {
            onVerificationOpen();
        }
    }, [verificationError, onVerificationOpen]);

    const handleSignUp = (data: SignUpInputs) => {
        setEmail(data.email);
        signUpUser({
            firstName: data.name,
            lastName: data.surname,
            email: data.email,
            login: data.login,
            password: data.password,
        })
            .unwrap()
            .then(() => {
                onLastStepOpen();
                dispatch(
                    setNotification({
                        title: '',
                        description: '',
                        typeN: 'success',
                    }),
                );
            })
            .catch((err) => {
                if (err.status === 400) {
                    dispatch(
                        setNotification({
                            title: err.data?.message,
                            description: '',
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
        <>
            {isLoading && <Loader />}
            <form onSubmit={handleSubmit(handleSignUp)} data-test-id='sign-up-form'>
                <Flex sx={FormStyle}>
                    <Flex flexDirection='column'>
                        <FormLabel sx={LabelStyle}>
                            {step === 1 ? 'Шаг 1. Личная информация' : 'Шаг 2. Логин и пароль'}
                        </FormLabel>
                        <Progress
                            value={progress}
                            hasStripe
                            size='sm'
                            bg='rgba(0, 0, 0, 0.06)'
                            w='100%'
                            data-test-id='sign-up-progress'
                        />
                    </Flex>
                    {step === 1 ? (
                        <Flex flexDirection='column' gap='48px'>
                            <Flex flexDirection='column' gap='24px'>
                                <FormControl isInvalid={!!errors.name}>
                                    <FormLabel sx={LabelStyle}>Ваше имя</FormLabel>
                                    <Input
                                        type='text'
                                        {...register('name')}
                                        placeholder='Имя'
                                        onBlur={(e) => {
                                            e.target.value = e.target.value.trim();
                                        }}
                                        sx={InputStyle}
                                        data-test-id='first-name-input'
                                    />
                                    {errors.name && (
                                        <FormErrorMessage>{errors.name.message}</FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl isInvalid={!!errors.surname}>
                                    <FormLabel sx={LabelStyle}>Ваша фамилия</FormLabel>
                                    <Input
                                        type='text'
                                        {...register('surname')}
                                        placeholder='Фамилия'
                                        onBlur={(e) => {
                                            e.target.value = e.target.value.trim();
                                        }}
                                        sx={InputStyle}
                                        data-test-id='last-name-input'
                                    />
                                    {errors.surname && (
                                        <FormErrorMessage>
                                            {errors.surname.message}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                                <FormControl isInvalid={!!errors.email}>
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
                            </Flex>
                            <Button
                                type='button'
                                variant='solid'
                                onClick={handleNextStep}
                                sx={SubmitButtonStyle}
                                data-test-id='submit-button'
                            >
                                Дальше
                            </Button>
                        </Flex>
                    ) : null}
                    {step == 2 ? (
                        <Flex flexDirection='column' gap='48px'>
                            <Flex flexDirection='column' gap='24px'>
                                <FormControl isInvalid={!!errors.login}>
                                    <FormLabel sx={LabelStyle}>Логин для входа на сайт</FormLabel>
                                    <Input
                                        type='text'
                                        {...register('login')}
                                        placeholder='Введите логин'
                                        sx={InputStyle}
                                        data-test-id='login-input'
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
                            <Button
                                type='submit'
                                variant='solid'
                                disabled={
                                    !!errors.login || !!errors.password || !!errors.confirmPassword
                                }
                                sx={SubmitButtonStyle}
                                data-test-id='submit-button'
                            >
                                Зарегистрироваться
                            </Button>
                        </Flex>
                    ) : null}
                </Flex>
            </form>
            <LastStepModal isOpen={isLastStepOpen} onClose={onLastStepClose} email={email} />
            <VerificationModal isOpen={isVerificationOpen} onClose={onVerificationClose} />
        </>
    );
}

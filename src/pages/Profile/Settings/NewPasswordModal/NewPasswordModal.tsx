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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useUpdatePasswordMutation } from '~/api/authApi';
import { InputStyle, LabelStyle, ViewStyle } from '~/pages/Auth/Login/login.style';
import { ContentStyle, HeaderStyle } from '~/pages/Verification/components/VerificationModal.style';
import { setNotification } from '~/services/features/notificationSlice';

import { schema } from './shema';

export interface NewPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export type PasswordInputs = {
    password: string;
    newPassword: string;
    confirmPassword: string;
};

export function NewPasswordModal({ isOpen, onClose }: NewPasswordModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<PasswordInputs>({
        mode: 'onChange',
        resolver: yupResolver(schema),
    });
    const [updatePassword] = useUpdatePasswordMutation();
    const dispatch = useDispatch();
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleUpdate = (data: Omit<PasswordInputs, 'confirmPassword'>) => {
        updatePassword({
            password: data.password,
            newPassword: data.newPassword,
        })
            .unwrap()
            .then(() => {
                dispatch(
                    setNotification({
                        title: 'Пароль успешно изменен',
                        description: '',
                        typeN: 'success',
                    }),
                );
                onClose();
            })
            .catch((err) => {
                if (err.status === 400) {
                    if (err.data?.message?.includes('Неверный пароль')) {
                        setError('password', {
                            type: 'manual',
                            message: 'Неверный пароль',
                        });
                        dispatch(
                            setNotification({
                                title: 'Неверный пароль',
                                description: '',
                                typeN: 'error',
                            }),
                        );
                    } else if (err.data?.message?.includes('совпадают')) {
                        setError('newPassword', {
                            type: 'manual',
                            message: 'Новый и старый пароль совпадают',
                        });
                        dispatch(
                            setNotification({
                                title: err.data?.message || 'Новый и старый пароль совпадают',
                                description: '',
                                typeN: 'error',
                            }),
                        );
                    }
                } else {
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
            <ModalContent sx={ContentStyle} gap='24px'>
                <ModalHeader sx={HeaderStyle}>Сменить пароль</ModalHeader>
                <ModalCloseButton
                    color='black'
                    border='2px solid black'
                    borderRadius='50%'
                    right='32px'
                    top='32px'
                    onClick={() => {
                        reset();
                        onClose();
                    }}
                />
                <ModalBody p={0}>
                    <form onSubmit={handleSubmit(handleUpdate)} style={{ gap: '32px' }}>
                        <Flex flexDirection='column' gap='24px'>
                            <FormControl isInvalid={!!errors.password} gap='4px'>
                                <FormLabel sx={LabelStyle}>Введите старый пароль</FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showOldPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        sx={InputStyle}
                                        placeholder='Старый пароль'
                                        data-test-id='password-input'
                                    />
                                    <InputRightElement sx={ViewStyle}>
                                        <IconButton
                                            variant='ghost'
                                            size='sm'
                                            icon={showOldPassword ? <ViewIcon /> : <ViewOffIcon />}
                                            aria-label='Показать пароль'
                                            onMouseDown={() => setShowOldPassword(true)}
                                            onMouseUp={() => setShowOldPassword(false)}
                                            onMouseLeave={() => setShowOldPassword(false)}
                                        />
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && (
                                    <FormErrorMessage>{errors.password.message}</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={!!errors.newPassword}>
                                <FormLabel sx={LabelStyle}>Введите новый пароль </FormLabel>
                                <InputGroup>
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('newPassword')}
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
                                {errors.newPassword && (
                                    <FormErrorMessage>
                                        {errors.newPassword.message}
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
                                                showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />
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
                            <Button
                                fontFamily='text'
                                fontSize='18px'
                                fontWeight={600}
                                type='submit'
                                bg='rgba(0, 0, 0, 0.92)'
                                p='0px 24px'
                                color='white'
                            >
                                Сохранить пароль
                            </Button>
                        </Flex>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

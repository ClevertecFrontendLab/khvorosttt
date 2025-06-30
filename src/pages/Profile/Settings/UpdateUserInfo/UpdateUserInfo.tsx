import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
    Text,
    useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useUpdateUserInfoMutation } from '~/api/authApi';
import { userI } from '~/interfaces/bloggerI';
import { InputStyle, LabelStyle } from '~/pages/Auth/Login/login.style';
import { setNotification } from '~/services/features/notificationSlice';

import { AvatarUploader } from '../AvatarUploader/AvatarUploader';
import { NewPasswordModal } from '../NewPasswordModal/NewPasswordModal';
import { schema } from '../shema';

export type UpdateInputs = {
    firstName: string;
    lastName: string;
};

export interface UpdateUserInfoProps {
    user: userI | undefined;
}

export function UpdateUserInfo({ user }: UpdateUserInfoProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateInputs>({
        mode: 'onSubmit',
        resolver: yupResolver(schema),
        defaultValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
        },
    });
    const [updateInfo] = useUpdateUserInfoMutation();
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!user) return null;

    const handleUpdateInfo = (data: UpdateInputs) => {
        updateInfo({ data: data })
            .unwrap()
            .then(() => {
                dispatch(
                    setNotification({
                        title: 'Изменения сохранены',
                        description: '',
                        typeN: 'success',
                    }),
                );
            })
            .catch(() => {
                dispatch(
                    setNotification({
                        title: 'Ошибка сервера.',
                        description: 'Попробуйте позже.',
                        typeN: 'error',
                    }),
                );
            });
    };

    return (
        <Flex flexDirection='column' gap='24px' alignItems='center'>
            <Text fontFamily='text' fontSize='20px' fontWeight='600' alignSelf='flex-start'>
                Авторизация и персонализация
            </Text>
            <AvatarUploader />
            <form onSubmit={handleSubmit(handleUpdateInfo)} style={{ width: '100%' }}>
                <Flex gap='24px' flexDirection='column' w='100%'>
                    <Flex gap='10px' flexDirection={{ base: 'column', ms: 'row' }}>
                        <FormControl isInvalid={!!errors.firstName}>
                            <FormLabel sx={LabelStyle}>Имя</FormLabel>
                            <Input
                                type='text'
                                {...register('firstName')}
                                placeholder='Имя'
                                onBlur={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                                sx={InputStyle}
                                data-test-id='first-name-input'
                            />
                            {errors.firstName && (
                                <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={!!errors.lastName}>
                            <FormLabel sx={LabelStyle}>Фамилия</FormLabel>
                            <Input
                                type='text'
                                {...register('lastName')}
                                placeholder='Фамилия'
                                onBlur={(e) => {
                                    e.target.value = e.target.value.trim();
                                }}
                                sx={InputStyle}
                                data-test-id='last-name-input'
                            />
                            {errors.lastName && (
                                <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>
                            )}
                        </FormControl>
                    </Flex>
                    <Flex gap='10px' flexDirection={{ base: 'column', ms: 'row' }}>
                        <FormControl isDisabled>
                            <FormLabel sx={LabelStyle}>Ваш e-mail</FormLabel>
                            <Input
                                type='text'
                                placeholder='e-mail'
                                sx={InputStyle}
                                data-test-id='email-input'
                                value={user?.email}
                            />
                        </FormControl>
                        <FormControl isDisabled>
                            <FormLabel sx={LabelStyle}>Логин</FormLabel>
                            <Input
                                type='text'
                                placeholder='Введите логин'
                                sx={InputStyle}
                                data-test-id='login-input'
                                value={user?.login}
                            />
                            <FormHelperText>
                                Логин не менее 5 символов, только латиница
                            </FormHelperText>
                        </FormControl>
                    </Flex>
                    <Button
                        alignSelf='flex-start'
                        variant='ghost'
                        fontFamily='text'
                        fontSize='18px'
                        fontWeight={600}
                        p='0px 24px'
                        w='168px'
                        onClick={onOpen}
                    >
                        Сменить пароль
                    </Button>
                    <Button
                        alignSelf='flex-start'
                        type='submit'
                        fontFamily='text'
                        fontSize='18px'
                        fontWeight={600}
                        p='0px 24px'
                        w='248px'
                        color='white'
                        bg='black'
                        borderRadius='6px'
                    >
                        Сохранить изменения
                    </Button>
                </Flex>
            </form>
            <NewPasswordModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}

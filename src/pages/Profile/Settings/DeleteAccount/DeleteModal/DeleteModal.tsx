import {
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useDeleteProfileMutation } from '~/api/authApi';
import breakfast from '~/assets/images/Breakfast.png';
import { Loader } from '~/components/Loader/Loader';
import {
    CloseStyle,
    ContentStyle,
    HeaderStyle,
    HelpStyle,
    TextStyle,
} from '~/pages/Verification/components/VerificationModal.style';
import { setNotification } from '~/services/features/notificationSlice';

export interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DeleteModal({ isOpen, onClose }: DeleteModalProps) {
    const [deleteProfile, { isLoading }] = useDeleteProfileMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDelete = () => {
        deleteProfile()
            .unwrap()
            .then(() => {
                dispatch(
                    setNotification({
                        title: 'Аккаунт успешно удалён.',
                        description: '',
                        typeN: 'success',
                    }),
                );
                localStorage.removeItem('access_token');
                navigate('/auth/login');
            })
            .catch(() => {
                dispatch(
                    setNotification({
                        title: 'Ошибка сервера.',
                        description: 'Попробуйте позже',
                        typeN: 'error',
                    }),
                );
            })
            .finally(() => onClose());
    };

    if (isLoading) return <Loader />;

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent sx={ContentStyle}>
                <Image src={breakfast} w={{ base: '108px', lg: '206px' }} />
                <ModalHeader sx={HeaderStyle}>
                    Действительно хотите удалить свой аккаунт?
                </ModalHeader>
                <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                <ModalBody flexDirection='column' gap='16px' display='flex'>
                    <Text sx={TextStyle}>
                        Если вы удалите аккаунт, вы больше не сможете всеми функциями сервиса,
                        которые вы использовали.
                    </Text>
                    <Text sx={TextStyle}>
                        Мы удалим все ваши опубликованные рецепты и записи в блоге.
                    </Text>
                </ModalBody>
                <ModalFooter w='100%' flexDirection='column' gap='32px'>
                    <Button
                        bg='rgba(0, 0, 0, 0.92)'
                        borderRadius='6px'
                        p='0px 24px'
                        color='white'
                        w={{ base: '252px', lg: '332px' }}
                        onClick={handleDelete}
                    >
                        Удалить мой аккаунт
                    </Button>
                    <Text sx={HelpStyle}>
                        Остались вопросы? Свяжитесь{' '}
                        <span style={{ textDecoration: 'underline' }}>с поддержкой</span>
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

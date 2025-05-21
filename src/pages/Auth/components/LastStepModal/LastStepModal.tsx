import {
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
import { Link, useNavigate } from 'react-router';

import lastStep from '~/assets/images/lastStep.png';

import {
    CloseStyle,
    ContentStyle,
    EmailStyle,
    HeaderStyle,
    HelpStyle,
    TextStyle,
} from './LastStepModal.style';

interface LastStepModalProps {
    isOpen: boolean;
    onClose: () => void;
    email: string;
}

export function LastStepModal({ isOpen, onClose, email }: LastStepModalProps) {
    const navigate = useNavigate();
    const handleClose = () => {
        onClose();
        navigate('auth/login');
    };
    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='sign-up-success-modal' sx={ContentStyle}>
                <Image src={lastStep} w={{ base: '108px', lg: '206px' }} />
                <ModalHeader sx={HeaderStyle}>
                    Остался последний шаг. Нужно верифицировать ваш e-mail{' '}
                </ModalHeader>
                <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                <ModalBody>
                    <Text sx={TextStyle}>
                        Мы отправили вам на почту
                        <br />
                        <Text as='span' sx={EmailStyle}>
                            {email}
                        </Text>
                        <br />
                        ссылку для верификации.
                    </Text>
                </ModalBody>
                <ModalFooter w='100%'>
                    <Text sx={HelpStyle}>
                        Не пришло письмо? Проверьте папку Спам.По другим вопросам свяжитесь{' '}
                        <Link to='/not-found'>с поддержкой</Link>
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

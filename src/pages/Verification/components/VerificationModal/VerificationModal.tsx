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
import { Link } from 'react-router';

import ops from '~/assets/images/Ops.png';

import {
    CloseStyle,
    ContentStyle,
    HeaderStyle,
    HelpStyle,
    TextStyle,
} from '../VerificationModal.style';

interface VerificationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function VerificationModal({ isOpen, onClose }: VerificationModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='email-verification-failed-modal' sx={ContentStyle}>
                <Image src={ops} w={{ base: '108px', lg: '206px' }} />
                <ModalHeader sx={HeaderStyle}>Упс! Что-то пошло не так</ModalHeader>
                <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                <ModalBody>
                    <Text sx={TextStyle}>
                        Ваша ссылка для верификации недействительна. Попробуйте зарегистрироваться
                        снова.
                    </Text>
                </ModalBody>
                <ModalFooter w='100%'>
                    <Text sx={HelpStyle}>
                        Остались вопросы? Свяжитесь <Link to='/not-found'>с поддержкой</Link>
                    </Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

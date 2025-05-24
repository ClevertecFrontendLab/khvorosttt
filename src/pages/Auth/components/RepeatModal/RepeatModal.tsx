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

import notIn from '~/assets/images/Breakfast.png';

import { ButtonStyle, CloseStyle, ContentStyle, HeaderStyle, TextStyle } from './repeatModal.style';

interface RepeatModalProps {
    isOpen: boolean;
    onClose: () => void;
    repeater?: () => void;
}

export function RepeatModal({ isOpen, onClose, repeater }: RepeatModalProps) {
    const handleRepeat = () => {
        onClose();
        repeater?.();
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='sign-in-error-modal' sx={ContentStyle}>
                <Image src={notIn} w={{ base: '108px', lg: '206px' }} />
                <ModalHeader sx={HeaderStyle}>Вход не выполнен</ModalHeader>
                <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                <ModalBody>
                    <Text sx={TextStyle}>
                        Что-то пошло не так.
                        <br />
                        Попробуйте еще раз.
                    </Text>
                </ModalBody>
                <ModalFooter w='100%'>
                    <Button sx={ButtonStyle} onClick={handleRepeat} data-test-id='repeat-button'>
                        Повторить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

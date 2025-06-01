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
} from '@chakra-ui/react';

import notIn from '~/assets/images/Breakfast.png';

interface PreventiveModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function PreventiveModal({ isOpen, onClose }: PreventiveModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='recipe-preventive-modal' sx={ContentStyle}>
                <Image src={notIn} w={{ base: '108px', lg: '206px' }} />
                <ModalHeader sx={HeaderStyle}>Выйти без сохранения?</ModalHeader>
                <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                <ModalBody>Чтобы сохранить, нажмите кнопку сохранить черновик</ModalBody>
                <ModalFooter w='100%'>
                    <Button sx={ButtonStyle} onClick={() => {}}>
                        Сохранить черновик
                    </Button>
                    <Button sx={ButtonStyle} onClick={() => {}}>
                        Выйти без сохранения
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

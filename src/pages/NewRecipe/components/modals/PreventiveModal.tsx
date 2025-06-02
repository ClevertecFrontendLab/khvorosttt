import { EditIcon } from '@chakra-ui/icons';
import {
    Box,
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
import { useFormContext } from 'react-hook-form';

import notIn from '~/assets/images/Breakfast.png';

import { RecipeInputs } from '../../NewRecipe';
import { ButtonStyle, CloseStyle, ContentStyle, HeaderStyle, OutButtonStyle } from './modal.style';

interface PreventiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSaveDraft: (data: RecipeInputs) => Promise<void>;
    onConfirmOut: () => void;
}

export function PreventiveModal({
    isOpen,
    onClose,
    onSaveDraft,
    onConfirmOut,
}: PreventiveModalProps) {
    const methods = useFormContext<RecipeInputs>();

    const handleSaveDraft = async () => {
        const isValid = await methods.trigger('title');
        if (isValid) {
            const formData = methods.getValues();
            await onSaveDraft(formData);
            onClose();
        } else {
            onClose();
        }
    };
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent data-test-id='recipe-preventive-modal' sx={ContentStyle}>
                <Image src={notIn} w={{ base: '108px', lg: '206px' }} />
                <ModalCloseButton data-test-id='close-button' sx={CloseStyle} />
                <ModalBody flexDirection='column' gap='16px' p='0px'>
                    <ModalHeader sx={HeaderStyle}>Выйти без сохранения?</ModalHeader>
                    <Box textAlign='center'>Чтобы сохранить, нажмите кнопку сохранить черновик</Box>
                </ModalBody>
                <ModalFooter w='100%' flexDirection='column' gap='16px'>
                    <Button
                        leftIcon={<EditIcon color='white' />}
                        sx={ButtonStyle}
                        onClick={handleSaveDraft}
                    >
                        Сохранить черновик
                    </Button>
                    <Button sx={OutButtonStyle} variant='ghost' onClick={onConfirmOut}>
                        Выйти без сохранения
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

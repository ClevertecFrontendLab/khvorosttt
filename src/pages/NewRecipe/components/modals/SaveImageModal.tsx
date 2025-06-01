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
import { useEffect, useState } from 'react';

import { useUploadFileMutation } from '~/api/authApi';
import imageIcon from '~/assets/images/BsFillImageFill.png';
import { DATA_PATH } from '~/interfaces/authI';

import {
    ButtonDeleteStyle,
    ButtonStyle,
    CloseStyle,
    ContentStyle,
    HeaderStyle,
    ImageBoxStyle,
    ImageStyle,
} from './modal.style';

interface SaveImageModalProps {
    initialImage: string | null | undefined;
    isOpen: boolean;
    onClose: () => void;
    onImageSave: (url: string | null) => void;
    selectedFile: File | null;
}

export function SaveImageModal({
    initialImage,
    isOpen,
    onClose,
    onImageSave,
    selectedFile,
}: SaveImageModalProps) {
    const [currentPreviewImage, setCurrentPreviewImage] = useState<string | null | undefined>(
        initialImage,
    );
    const [uploadFile] = useUploadFileMutation();

    const handleSave = async () => {
        if (selectedFile) {
            try {
                const formData = new FormData();
                formData.append('file', selectedFile);
                const response = await uploadFile(formData).unwrap();
                onImageSave(response.url || null);
            } catch (err) {
                console.error('Ошибка загрузки:', err);
                onImageSave(null);
            }
        } else {
            onImageSave(currentPreviewImage || null);
        }
        setCurrentPreviewImage(null);
        onClose();
    };

    const handleDelete = () => {
        setCurrentPreviewImage(null);
        onImageSave(null);
        onClose();
    };

    useEffect(() => {
        if (isOpen) {
            setCurrentPreviewImage(initialImage);
        }
    }, [initialImage, isOpen]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent sx={ContentStyle} data-test-id='recipe-image-modal'>
                <ModalHeader sx={HeaderStyle}>Изображение</ModalHeader>
                <ModalCloseButton sx={CloseStyle} />
                <ModalBody p='0px'>
                    <Box sx={ImageBoxStyle} data-test-id='recipe-image-modal-image-block'>
                        {currentPreviewImage ? (
                            <Image
                                src={
                                    currentPreviewImage?.startsWith('data:')
                                        ? currentPreviewImage
                                        : `${DATA_PATH}${currentPreviewImage}`
                                }
                                sx={ImageStyle}
                                data-test-id='recipe-image-modal-preview-image'
                            />
                        ) : (
                            <Image src={imageIcon} w='32px' h='32px' sx={ImageStyle} />
                        )}
                    </Box>
                </ModalBody>
                {currentPreviewImage ? (
                    <ModalFooter display='flex' flexDirection='column' gap='10px' p='0px'>
                        <Button sx={ButtonStyle} onClick={handleSave}>
                            Сохранить
                        </Button>
                        <Button sx={ButtonDeleteStyle} onClick={handleDelete}>
                            Удалить
                        </Button>
                    </ModalFooter>
                ) : null}
            </ModalContent>
        </Modal>
    );
}

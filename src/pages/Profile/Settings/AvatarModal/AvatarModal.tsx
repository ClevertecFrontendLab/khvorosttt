import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { useDispatch } from 'react-redux';

import { useUpdateUserPhotoMutation } from '~/api/authApi';
import { setNotification } from '~/services/features/notificationSlice';

export interface AvatarModalProps {
    imageSrc: string;
    isOpen: boolean;
    onClose: () => void;
}

export function AvatarModal({ imageSrc, isOpen, onClose }: AvatarModalProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [zoom, setZoom] = useState(1);
    const [updatePhoto] = useUpdateUserPhotoMutation();
    const dispatch = useDispatch();

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCropAndSave = async () => {
        if (!imageSrc || !croppedAreaPixels) return;

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) throw new Error('Canvas error');
            const size = Math.min(croppedAreaPixels.width, croppedAreaPixels.height);
            canvas.width = size;
            canvas.height = size;

            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.src = imageSrc;

            await new Promise((resolve, reject) => {
                image.onload = resolve;
                image.onerror = reject;
            });

            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(
                image,
                croppedAreaPixels.x,
                croppedAreaPixels.y,
                croppedAreaPixels.width,
                croppedAreaPixels.height,
                0,
                0,
                size,
                size,
            );

            const blob = await new Promise<Blob | null>((resolve) => {
                canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.9);
            });

            if (!blob) throw new Error('Failed to create blob');

            const formData = new FormData();
            formData.append('file', blob, 'avatar.jpg');

            await updatePhoto(formData).unwrap();
        } catch (error) {
            console.error('Error cropping image:', error);
            dispatch(
                setNotification({
                    title: 'Ошибка сервера.',
                    description: 'Попробуйте позже',
                    typeN: 'error',
                }),
            );
        } finally {
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
            <ModalContent
                p='32px'
                borderRadius='16px'
                w={{ base: '316px', lg: '396px' }}
                alignItems='center'
                gap='32px'
            >
                <ModalHeader fontFamily='text' fontWeight={700} fontSize='24px' textAlign='center'>
                    Изменить
                    <br /> изображение профиля
                </ModalHeader>
                <ModalCloseButton
                    color='black'
                    border='2px solid black'
                    borderRadius='50%'
                    right='32px'
                    top='32px'
                />
                <ModalBody>
                    {imageSrc && (
                        <Box
                            position='relative'
                            width={{ base: '108px', lg: '206px' }}
                            height={{ base: '108px', lg: '206px' }}
                        >
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={1}
                                cropShape='round'
                                showGrid={false}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                                style={{
                                    containerStyle: {
                                        backgroundColor: 'transparent',
                                    },
                                    cropAreaStyle: {
                                        borderRadius: '50%',
                                        boxShadow: '0 0 0 9999px rgba(45, 177, 0, 0.5)',
                                    },
                                }}
                            />
                        </Box>
                    )}
                </ModalBody>
                <ModalFooter p='0px'>
                    <Button
                        bg='rgba(0, 0, 0, 0.92)'
                        borderRadius='6px'
                        p='0px 24px'
                        color='white'
                        w={{ base: '252px', lg: '332px' }}
                        onClick={handleCropAndSave}
                    >
                        Кадрировать и сохранить
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

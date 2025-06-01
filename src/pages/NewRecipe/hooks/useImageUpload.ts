import { useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function useImageUpload(fieldName: string) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { setValue } = useFormContext();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    setCurrentImage(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageSave = (url: string | null) => {
        setPreviewImage(url);
        setValue(fieldName, url || '', { shouldValidate: true });
        setSelectedFile(null);
        setCurrentImage(null);
        onClose();
    };

    return {
        previewImage,
        isModalOpen: isOpen,
        setPreviewImage,
        currentImage,
        setCurrentImage,
        selectedFile,
        handleFileChange,
        handleImageSave,
        openModal: onOpen,
        closeModal: onClose,
    };
}

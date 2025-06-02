import { useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

export function useImageUpload(fieldName: string) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { setValue, watch } = useFormContext();

    const formValue = watch(fieldName);

    useEffect(() => {
        if (formValue !== undefined) {
            setPreviewImage(formValue || null);
        }
    }, [formValue]);

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
        const newValue = url || '';
        setPreviewImage(newValue);
        setValue(fieldName, newValue, {
            shouldValidate: true,
            shouldDirty: true,
        });
        setSelectedFile(null);
        setCurrentImage(null);
        onClose();
    };

    const resetImage = () => {
        setPreviewImage(null);
        setCurrentImage(null);
        setSelectedFile(null);
        setValue(fieldName, '', {
            shouldValidate: true,
            shouldDirty: true,
        });
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
        resetImage,
    };
}

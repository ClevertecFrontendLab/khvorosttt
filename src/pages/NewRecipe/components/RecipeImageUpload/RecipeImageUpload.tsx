import { FormControl } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

import { useImageUpload } from '../../hooks/useImageUpload';
import { ImageUploadBox } from '../ImageUploadBox/ImageUploadBox';
import { SaveImageModal } from '../modals/SaveImageModal';

export function RecipeImageUpload() {
    const {
        watch,
        formState: { errors },
    } = useFormContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formImage = watch('image');

    const {
        previewImage,
        isModalOpen,
        currentImage,
        selectedFile,
        setCurrentImage,
        setPreviewImage,
        handleFileChange,
        handleImageSave,
        openModal,
        closeModal,
    } = useImageUpload('image');

    useEffect(() => {
        if (formImage) {
            setPreviewImage(formImage);
        }
    }, [formImage, setPreviewImage]);

    const handleClick = () => {
        setCurrentImage(formImage || null);
        openModal();
        fileInputRef.current?.click();
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e);
        openModal();
    };

    return (
        <FormControl isInvalid={!!errors.mainImg} w='fit-content'>
            <ImageUploadBox
                previewImage={previewImage}
                onClick={handleClick}
                testId='recipe-image-block'
            />

            <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
                data-test-id='recipe-image-block-input-file'
            />
            <SaveImageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                initialImage={currentImage}
                selectedFile={selectedFile}
                onImageSave={handleImageSave}
            />
        </FormControl>
    );
}

import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, FormLabel, IconButton, Textarea } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useController, useFormContext } from 'react-hook-form';

import { useImageUpload } from '../../hooks/useImageUpload';
import { ImageUploadBox } from '../ImageUploadBox/ImageUploadBox';
import { SaveImageModal } from '../modals/SaveImageModal';

interface StepRowProps {
    index: number;
    onRemove: () => void;
    isFirst: boolean;
}

export function StepRow({ index, onRemove, isFirst }: StepRowProps) {
    const { watch } = useFormContext();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formImage = watch(`steps.${index}.image`);

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
    } = useImageUpload(`steps.${index}.image`);

    useEffect(() => {
        if (formImage) {
            setPreviewImage(formImage);
        } else {
            setPreviewImage(null);
        }
    }, [formImage, setPreviewImage]);

    const {
        field: descriptionField,
        fieldState: { error: descriptionError },
    } = useController({
        name: `steps.${index}.description`,
    });

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
        <Flex position='relative' mb={4} flexDirection={{ base: 'column', md: 'row' }}>
            <input
                type='file'
                accept='image/*'
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleFileInputChange}
                data-test-id={`recipe-steps-image-block-${index}-input-file`}
            />

            <ImageUploadBox
                previewImage={previewImage}
                onClick={handleClick}
                testId={`recipe-steps-image-block-${index}`}
            />

            <Flex flexDirection='column' p='20px' gap='16px' flex={1}>
                <FormLabel
                    bg='rgba(0, 0, 0, 0.06)'
                    borderRadius='4px'
                    p='2px 8px'
                    w='fit-content'
                    justifySelf='start'
                    fontSize='sm'
                    fontWeight='medium'
                >
                    Шаг {index + 1}
                </FormLabel>

                <Textarea
                    {...descriptionField}
                    placeholder='Описание шага'
                    data-test-id={`recipe-steps-description-${index}`}
                    isInvalid={!!descriptionError}
                    minH='100px'
                    resize='vertical'
                />

                {!isFirst && (
                    <IconButton
                        position='absolute'
                        right='0px'
                        top='10px'
                        icon={<DeleteIcon color='#2db100' />}
                        onClick={onRemove}
                        aria-label='Удалить шаг'
                        variant='ghost'
                        size='sm'
                        data-test-id={`recipe-steps-remove-button-${index}`}
                    />
                )}
            </Flex>

            <SaveImageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                initialImage={currentImage}
                selectedFile={selectedFile}
                onImageSave={handleImageSave}
            />
        </Flex>
    );
}

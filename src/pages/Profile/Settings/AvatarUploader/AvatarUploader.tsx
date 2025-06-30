import { Avatar, Badge, Box, IconButton, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';

import { useGetCurrentUserInfoQuery } from '~/api/authApi';
import { PictureIcon } from '~/components/Icons/PictureIcon';
import { IMAGE_BASED_PATH } from '~/data/consts';

import { AvatarModal } from '../AvatarModal/AvatarModal';

export function AvatarUploader() {
    const { data: user } = useGetCurrentUserInfoQuery();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            onOpen();
        };
        reader.readAsDataURL(file);
    };

    return (
        <Box position='relative' display='inline-block' w={{ base: '96px', lg: '128px' }}>
            <Badge borderRadius='50%' p={0}>
                <Avatar
                    w={{ base: '96px', lg: '128px' }}
                    h={{ base: '96px', lg: '128px' }}
                    src={user?.photoLink ? `${IMAGE_BASED_PATH}/${user?.photoLink}` : ''}
                />
            </Badge>

            <IconButton
                aria-label='Изменить аватар'
                icon={<PictureIcon color='white' boxSize='14px' />}
                onClick={() => fileInputRef.current?.click()}
                position='absolute'
                bottom='0px'
                right='10px'
                w='30px'
                h='30px'
                minW='30px'
                minH='30px'
                borderRadius='50%'
                border='5px solid white'
                bg='black'
                color='white'
            />

            <input
                type='file'
                ref={fileInputRef}
                onChange={handleFileChange}
                accept='image/*'
                style={{ display: 'none' }}
            />

            <AvatarModal imageSrc={imageSrc || ''} isOpen={isOpen} onClose={onClose} />
        </Box>
    );
}

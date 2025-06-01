import { Box, Image } from '@chakra-ui/react';

import imageIcon from '~/assets/images/BsFillImageFill.png';
import { DATA_PATH } from '~/interfaces/authI';

import { BoxStyle, ImageStyle } from './imageUploadBox.style';

interface ImageUploadBoxProps {
    previewImage: string | null;
    onClick: () => void;
    testId?: string;
}

export function ImageUploadBox({ previewImage, onClick, testId }: ImageUploadBoxProps) {
    return (
        <Box
            data-test-id={testId}
            w={
                testId === 'recipe-image-block'
                    ? { base: '328px', md: '232px', xl: '353px', '3xl': '553px' }
                    : { base: '328px', md: '346px' }
            }
            h={testId === 'recipe-image-block' ? { base: '224px', xl: '410px' } : '160px'}
            onClick={onClick}
            sx={BoxStyle}
        >
            {previewImage ? (
                <Image
                    src={`${DATA_PATH}${previewImage}`}
                    data-test-id={`${testId}-preview-image`}
                    sx={ImageStyle}
                />
            ) : (
                <Image src={imageIcon} w='32px' h='32px' />
            )}
        </Box>
    );
}

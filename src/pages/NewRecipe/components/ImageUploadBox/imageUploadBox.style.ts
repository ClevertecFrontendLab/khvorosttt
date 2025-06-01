import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const BoxStyle: SystemStyleObject = {
    borderRadius: '8px',
    bg: 'rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
};

export const ImageStyle: SystemStyleObject = {
    maxW: '100%',
    maxH: '100%',
    objectFit: 'cover',
};

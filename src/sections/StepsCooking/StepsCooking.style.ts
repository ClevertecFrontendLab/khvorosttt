import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ImageStyle: SystemStyleObject = {
    objectFit: 'cover',
    maxW: { base: '100%', sm: '200px', lg: '100%' },
    w: { '2xl': '346px' },
    h: { '2xl': '244px' },
};

export const StepNameStyle: SystemStyleObject = {
    p: '2px 8px',
    borderRadius: '4px',
    w: 'fit-content',
};

export const StepDescriptionStyle: SystemStyleObject = {
    py: '2',
    fontWeight: 400,
    fontSize: '14px',
    fontStyle: 'text',
};

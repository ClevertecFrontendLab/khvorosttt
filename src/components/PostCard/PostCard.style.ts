import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const CardHeadingStyle: SystemStyleObject = {
    overflow: 'hidden',
    fontWeight: 500,
    fontSize: { base: '16px', lg: '18px' },
    fontFamily: 'text',
};

export const CardEmailStyle: SystemStyleObject = {
    color: 'rgba(0, 0, 0, 0.64)',
    fontWeight: 400,
    fontSize: { base: '12px', lg: '14px' },
    fontFamily: 'text',
};

export const CardDescriptionStyle: SystemStyleObject = {
    noOfLines: 2,
    fontSize: '14px',
    fontFamily: 'text',
    overflow: 'hidden',
    whiteSpace: 'normal',
};

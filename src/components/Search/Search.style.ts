import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const SearchHeaderStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontWeight: 700,
    fontSize: { base: '24px', lg: '48px' },
};

export const SearchDescriptionStyle: SystemStyleObject = {
    maxW: { base: '328px', md: '696px' },
    fontWeight: 500,
    fontSize: { base: '14px', lg: '16px' },
    color: 'rgba(0, 0, 0, 0.48)',
    fontFamily: 'text',
};

export const IconButtonStyle: SystemStyleObject = {
    bg: 'transparent',
    borderRadius: '6',
    p: '0px 9px',
    border: '1px solid rgba(0, 0, 0, 0.48);',
    w: { base: '32px', ms: '48px' },
};

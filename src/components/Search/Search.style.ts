import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const SearchHeaderStyle: SystemStyleObject = {
    fontStyle: 'text',
    fontWeight: 700,
    fontSize: { base: '24px', lg: '48px' },
};

export const SearchDescriptionStyle: SystemStyleObject = {
    maxW: { base: '328px', md: '696px' },
    fontWeight: 500,
    fontSize: { base: '14px', lg: '16px' },
    color: 'rgba(0, 0, 0, 0.48)',
};

export const MenuButtonStyle: SystemStyleObject = {
    variant: 'outline',
    bg: 'transparent',
    fontWeight: 400,
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.64)',
    fontStyle: 'text',
};

export const IconButtonStyle: SystemStyleObject = {
    bg: 'transparent',
    borderRadius: '6',
    border: '1px solid rgba(0, 0, 0, 0.48);',
};

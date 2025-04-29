import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const BreadCrumbStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontSize: '16px',
    fontWeight: 400,
    _focus: { boxShadow: 'none', outline: 'none', color: 'inherit' },
    _active: { bg: 'transparent', color: 'inherit' },
    _hover: { textDecoration: 'none', color: 'inherit' },
    cursor: 'pointer',
};

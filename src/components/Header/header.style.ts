import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const headerStyle: SystemStyleObject = {
    position: 'fixed',
    width: '100%',
    h: { base: '64px', xl: '80px' },
    padding: { xl: '16px 16px', base: '8px 20px' },
    zIndex: 6,
};

export const avatarStyle: SystemStyleObject = {
    w: '48px',
    h: '48px',
    border: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 'full',
};

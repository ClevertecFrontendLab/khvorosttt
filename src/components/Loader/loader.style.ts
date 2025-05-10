import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const LoaderStyle: SystemStyleObject = {
    position: 'fixed',
    top: '0',
    left: '0',
    w: '100%',
    h: '100%',
    bg: 'rgba(0, 0, 0, 0.16)',
    zIndex: 10,
    backdropFilter: 'blur(4px)',
};

export const LoaderSpinnerStyle: SystemStyleObject = {
    w: '206px',
    h: '206px',
    bg: 'radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

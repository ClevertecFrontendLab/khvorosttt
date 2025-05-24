import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const BurgerMenuBGStyle: SystemStyleObject = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 4,
    bg: 'rgba(0, 0, 0, 0.16)',
    backdropFilter: 'blur(4px)',
};

export const BurgerMenuStyle: SystemStyleObject = {
    flexDirection: 'column',
    position: 'absolute',
    zIndex: 5,
    bg: 'white',
    w: '344px',
    p: '16px 0px 0px 0px',
    margin: '64px 8px 0px 8px',
    right: 0,
    borderRadius: '0px 0px 12px 12px',
    maxH: { base: '652px', md: '868px' },
    overflowY: 'hidden',
};

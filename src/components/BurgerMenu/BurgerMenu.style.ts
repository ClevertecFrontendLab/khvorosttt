import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const BurgerMenuBGStyle: SystemStyleObject = {
    position: 'fixed',
    h: '100%',
    w: '100vw',
    zIndex: 4,
    backdropFilter: 'blur(4px)',
    bg: 'rgba(0, 0, 0, 0.16)',
    right: 0,
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

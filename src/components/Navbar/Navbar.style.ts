import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const NavbarStyle: SystemStyleObject = {
    bg: 'white',
    width: '256px',
    overflowY: 'hidden',
    position: { base: 'none', xl: 'fixed' },
    left: { base: 'none', xl: '0px' },
    top: { base: '40px', xl: '104px' },
    bottom: { base: 'none', xl: '0px' },
    right: { base: '0px', xl: 'none' },
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '0px 0px 12px 12px',
    scrollbarWidth: 'thin',
    scrollbarColor: 'rgba(0, 0, 0, 0.16) transparent',
    p: '10px 16px 10px 10px',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'rgba(0, 0, 0, 0.04)',
    },
    '&::-webkit-scrollbar-thumb': {
        background: 'rgba(0, 0, 0, 0.16)',
        borderRadius: '8px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
        background: 'rgba(0, 0, 0, 0.2)',
    },
    '&::-webkit-scrollbar-button': {
        display: 'none',
        height: 0,
        width: 0,
    },
};

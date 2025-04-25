import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const NavbarStyle: SystemStyleObject = {
    bg: 'white',
    width: { base: '344px', xl: '256px' },
    overflowY: 'hidden',
    position: { base: 'none', xl: 'fixed' },
    left: { base: 'none', xl: '0px' },
    top: { base: '40px', xl: '104px' },
    bottom: { base: 'none', xl: '0px' },
    right: { base: '0px', xl: 'none' },
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '0px 0px 12px 12px',
    p: '10px 16px 10px 10px',
};

import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const FooterStyle: SystemStyleObject = {
    bg: '#ffffd3',
    width: '100%',
    h: '84px',
    position: 'fixed',
    bottom: 0,
    zIndex: 3,
};

export const HomeIconStyle: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    bg: 'black',
    borderRadius: 50,
    p: '0px 12px',
    w: '40px',
    h: '40px',
};

export const AvatarStyle: SystemStyleObject = {
    w: '40px',
    h: '40px',
    border: '1px',
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 50,
};

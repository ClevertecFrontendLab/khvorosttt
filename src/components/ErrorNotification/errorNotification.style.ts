import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ErrorNotificationStyle: SystemStyleObject = {
    position: 'fixed',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    w: { base: '328px', '2xl': '400px' },
    p: '12px 18px',
    bg: '#e53e3e',
    justifyContent: 'space-between',
    zIndex: 100,
};

export const ErrorHeadingStyle: SystemStyleObject = {
    color: 'white',
    fontWeight: 700,
    fontSize: '16px',
    fontFamily: 'text',
};

export const ErrorTextStyle: SystemStyleObject = {
    color: 'white',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'text',
};

export const ErrorCloseButtonStyle: SystemStyleObject = {
    alignSelf: 'flex-start',
    position: 'relative',
    right: 0,
    top: 0,
    color: 'white',
};

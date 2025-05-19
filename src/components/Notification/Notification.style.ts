import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const NotificationStyle: SystemStyleObject = {
    position: 'fixed',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    w: { base: '328px', '2xl': '400px' },
    p: '12px 18px',
    justifyContent: 'space-between',
    zIndex: 100,
};

export const HeadingStyle: SystemStyleObject = {
    color: 'white',
    fontWeight: 700,
    fontSize: '16px',
    fontFamily: 'text',
};

export const TextStyle: SystemStyleObject = {
    color: 'white',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'text',
};

export const CloseButtonStyle: SystemStyleObject = {
    alignSelf: 'flex-start',
    position: 'relative',
    right: 0,
    top: 0,
    color: 'white',
};

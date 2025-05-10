import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ErrorPageStyle: SystemStyleObject = {
    w: '100%',
    h: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    p: '0',
};

export const ErrorContentStyle: SystemStyleObject = {
    flexDirection: 'column',
    gap: '32px',
    alignItems: 'center',
};

export const ErrorImageStyle: SystemStyleObject = {
    maxW: { base: '108px', '2xl': '206px' },
};

export const ErrorContentContainerStyle: SystemStyleObject = {
    flexDirection: 'column',
    gap: '16px',
    maxW: { base: '200px', xl: 'inherit' },
};

export const ErrorHeadingStyle: SystemStyleObject = {
    fontWeight: 700,
    fontSize: '24px',
    fontFamily: 'text',
    textAlign: 'center',
};

export const ErrorTextStyle: SystemStyleObject = {
    fontWeight: 400,
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.64)',
    textAlign: 'center',
};

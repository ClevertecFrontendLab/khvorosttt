import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ContentStyle: SystemStyleObject = {
    w: { base: '316px', lg: '396px' },
    bg: 'white',
    borderRadius: '16px',
    alignItems: 'center',
    p: '32px',
};

export const HeaderStyle: SystemStyleObject = {
    fontWeight: 700,
    fontSize: '24px',
    fontFamily: 'text',
    textAlign: 'center',
};

export const CloseStyle: SystemStyleObject = {
    color: 'black',
    border: '1px solid black',
    borderRadius: '50px',
};

export const TextStyle: SystemStyleObject = {
    color: 'rgba(0, 0, 0, 0.92)',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'text',
    textAlign: 'center',
};

export const HelpStyle: SystemStyleObject = {
    color: 'rgba(0, 0, 0, 0.48)',
    fontWeight: 400,
    fontSize: '12px',
    fontFamily: 'text',
    textAlign: 'center',
};

export const EmailStyle: SystemStyleObject = {
    fontWeight: 600,
};

import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ButtonStyle: SystemStyleObject = {
    p: '0px 24px',
    borderRadius: '6px',
    color: 'white',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    bg: 'rgba(0, 0, 0, 0.92)',
    h: '48px',
    fontWeight: 600,
    fontSize: '18px',
    fontFamily: 'text',
    w: '100%',
};

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
    color: 'rgba(0, 0, 0, 0.64)',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'text',
    textAlign: 'center',
};

export const LabelStyle: SystemStyleObject = {
    color: 'black',
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'text',
    textAlign: 'center',
};

export const HelpStyle: SystemStyleObject = {
    color: 'rgba(0, 0, 0, 0.64)',
    fontWeight: 400,
    fontSize: '12px',
    fontFamily: 'text',
    textAlign: 'center',
};

export const ViewStyle: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    h: '48px',
};

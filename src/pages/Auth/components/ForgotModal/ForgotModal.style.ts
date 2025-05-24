import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ContentStyle: SystemStyleObject = {
    w: { base: '316px', lg: '396px' },
    bg: 'white',
    borderRadius: '16px',
    alignItems: 'center',
    p: '32px',
};

export const LabelStyle: SystemStyleObject = {
    fontWeight: 400,
    fontSize: '16px',
    fontFamily: 'text',
    color: 'black',
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

export const ButtonStyle: SystemStyleObject = {
    p: '0px 24px',
    borderRadius: '6px',
    color: 'white',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    bg: 'rgba(0, 0, 0, 0.92)',
    h: '48px',
    fontWeight: 600,
    fontSize: '18px',
    w: '100%',
};

export const InputStyle: SystemStyleObject = {
    h: '48px',
    borderRadius: '6px',
    border: '1px solid #d7ff94',
    color: '#134b00',
    fontWeight: 400,
    fontSize: '18px',
    '&::placeholder': {
        color: '#134b00',
    },
    '&:focus': {
        borderColor: '#134b00',
        outline: 'none',
        boxShadow: 'none',
    },
};

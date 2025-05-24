import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const FormStyle: SystemStyleObject = {
    mt: '40px',
    gap: '112px',
    flexDirection: 'column',
    w: { base: '328px', md: '355px', lg: '461px' },
};

export const LabelStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: '16px',
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

export const SubmitButtonStyle: SystemStyleObject = {
    p: '0px 24px',
    borderRadius: '6px',
    color: 'white',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    bg: 'rgba(0, 0, 0, 0.92)',
    h: '48px',
    fontWeight: 600,
    fontSize: '18px',
};

export const ForgotButtonStyle: SystemStyleObject = {
    p: '0px 16px',
    h: '24px',
    fontWeight: 600,
    fontSize: '16px',
    color: 'black',
};

export const ViewStyle: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    h: '48px',
};

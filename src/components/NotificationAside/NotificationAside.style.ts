import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const NotificationAsideStyle: SystemStyleObject = {
    p: '90px 0px',
    h: '100%',
    alignItems: 'center',
    w: '256px',
    position: 'fixed',
    right: 0,
};

export const NoteElementStyle: SystemStyleObject = {
    flexDirection: 'column',
    mt: 'auto',
    h: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '5px',
};

export const NoteStyle: SystemStyleObject = {
    bg: '#000',
    boxShadow: '0 0 50px #d7ff94',
    borderRadius: 'full',
    w: '48px',
    h: '48px',
    p: '0px 12px',
    alignItems: 'center',
};

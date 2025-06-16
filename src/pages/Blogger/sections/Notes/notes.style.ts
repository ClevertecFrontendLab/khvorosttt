import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const NotesStyle: SystemStyleObject = {
    borderRadius: '16px',
    bg: 'rgba(0, 0, 0, 0.04)',
    p: '24px 24px 16px 24px',
    flexDirection: 'column',
    gap: '16px',
};

export const NotesCountStyle: SystemStyleObject = {
    color: 'rgba(0, 0, 0, 0.48)',
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: { base: '20px', lg: '36px' },
};

export const ButtonStyle: SystemStyleObject = {
    alignSelf: 'center',
    p: '0px 16px',
    w: '147px',
    h: '32px',
    fontWeight: 600,
    fontSize: { base: '12px', lg: '14px' },
    borderRadius: '6px',
};

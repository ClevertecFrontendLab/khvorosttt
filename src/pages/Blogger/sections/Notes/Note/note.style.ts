import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const NoteCardStyle: SystemStyleObject = {
    w: { base: '296px', sm: '224px', xl: '267px', '3xl': '427px' },
    h: { base: '204px', sm: '216px', xl: '204px', '3xl': '164px' },
    p: '24px 24px 20px 24px',
    borderRadius: '8px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    gap: '24px',
    flexDirection: 'column',
    bg: 'white',
    overflow: 'hidden',
};

export const DateStyle: SystemStyleObject = {
    color: '#2db100',
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: '14px',
};

export const TextStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: '14px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    h: '100%',
};

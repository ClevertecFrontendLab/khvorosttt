import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ContentStyle: SystemStyleObject = {
    w: { base: '316px', md: '396px' },
    p: '32px',
    borderRadius: '16px',
    alignItems: 'center',
    gap: '32px',
};

export const HeaderStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontWeight: 700,
    fontSize: '24px',
    textAlign: 'center',
    p: '0px',
};

export const CloseStyle: SystemStyleObject = {
    color: 'black',
    border: '1px solid black',
    borderRadius: '50px',
    w: '24px',
    h: '24px',
};

export const ImageBoxStyle: SystemStyleObject = {
    w: { base: '108px', md: '206px' },
    h: { base: '108px', md: '206px' },
    borderRadius: '8px',
    bg: 'rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

export const ImageStyle: SystemStyleObject = {
    maxH: '100%',
    maxW: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
};

export const ButtonStyle: SystemStyleObject = {
    w: { base: '252px', md: '332px' },
    h: '48px',
    borderRadius: '6px',
    p: '0px 24px',
    bg: 'black',
    color: 'white',
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: '18px',
};

export const ButtonDeleteStyle: SystemStyleObject = {
    w: { base: '252px', md: '332px' },
    h: '48px',
    borderRadius: '6px',
    p: '0px 24px',
    bg: 'transparent',
    color: 'black',
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: '18px',
};

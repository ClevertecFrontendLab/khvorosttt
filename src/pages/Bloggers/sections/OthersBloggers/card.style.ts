import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const CardStyle: SystemStyleObject = {
    overflow: 'hidden',
    h: { base: '208px', lg: '224px' },
    w: { base: '304px', md: '340px', '2xl': '408px', '3xl': '426px' },
    position: 'relative',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '8px',
};

export const FollowStyle: SystemStyleObject = {
    w: '114px',
    h: '24px',
    bg: 'black',
    color: 'white',
    borderRadius: '6px',
    p: '0px 8px',
    fontWeight: 600,
    fontSize: '12px',
    fontFamily: 'text',
};

export const FollowedStyle: SystemStyleObject = {
    w: '114px',
    h: '24px',
    bg: 'transparent',
    color: 'black',
    borderRadius: '6px',
    p: '0px 8px',
    fontWeight: 600,
    fontSize: '12px',
    fontFamily: 'text',
    border: '1px solid rgba(0, 0, 0, 0.48)',
};

export const ReadButtonStyle: SystemStyleObject = {
    w: '86px',
    h: '24px',
    borderRadius: '6px',
    p: '0px 12px',
    border: '1px solid #2db100',
    color: '#2db100',
    fontFamily: 'text',
    fontWeight: 600,
    fontSize: '14px',
};

export const NewRecipeStyle: SystemStyleObject = {
    position: 'absolute',
    top: '3px',
    right: '3px',
    borderRadius: '4px',
    padding: '2px 8px',
    bg: 'rgba(0, 0, 0, 0.06)',
    fontFamily: 'text',
    fontWeight: 400,
    fontSize: '14px',
};

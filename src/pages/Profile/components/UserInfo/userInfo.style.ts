import { SystemStyleObject } from '@chakra-ui/react';

export const BoxStyle: SystemStyleObject = {
    align: 'center',
    w: '100%',
    gap: '24px',
    flexDirection: { base: 'column', ms: 'row' },
    position: 'relative',
};
export const AvatarStyle: SystemStyleObject = {
    w: { base: '96px', lg: '128px' },
    h: { base: '96px', lg: '128px' },
};

export const InfoStyle: SystemStyleObject = {
    flexDirection: 'column',
    textAlign: 'left',
    gap: '12px',
    alignItems: { base: 'center', ms: 'initial' },
};

export const NameStyle: SystemStyleObject = {
    color: 'black',
    fontSize: { base: '24px', '2xl': '48px' },
    fontWeight: 700,
    fontFamily: 'text',
};

export const LoginStyle: SystemStyleObject = {
    color: 'rgba(0, 0, 0, 0.64)',
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'text',
};

export const LikeBookmarkStyle: SystemStyleObject = {
    color: '#2db100',
    fontWeight: 600,
    fontSize: '12px',
    fontFamily: 'text',
};

export const SettingButtonStyle: SystemStyleObject = {
    position: 'absolute',
    p: '12px',
    w: '24px',
    h: '24px',
    right: '0px',
    top: '0px',
};

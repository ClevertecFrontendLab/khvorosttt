import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const InfoCardStyle: SystemStyleObject = {
    gap: '24px',
    flexDirection: { base: 'column', ms: 'row' },
    alignSelf: 'center',
    alignItems: 'center',
};

export const AvatarStyle: SystemStyleObject = {
    w: { base: '96px', lg: '128px' },
    h: { base: '96px', lg: '128px' },
};

export const ContentStyle: SystemStyleObject = {
    flexDirection: 'column',
    gap: '12px',
    minW: { base: '328px', ms: '268px', lg: '257px' },
    alignItems: { base: 'center', ms: 'initial' },
};

export const NameStyle: SystemStyleObject = {
    color: 'black',
    fontWeight: 700,
    fontSize: { base: '24px', lg: '48px' },
    fontFamily: 'text',
};

export const LoginStyle: SystemStyleObject = {
    color: 'rgba(0, 0, 0, 0.64)',
    fontWeight: 400,
    fontSize: '14px',
    fontFamily: 'text',
};

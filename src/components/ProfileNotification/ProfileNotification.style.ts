import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const ProfileNotificationStyle: SystemStyleObject = {
    width: '256px',
    p: '0px 16px',
    flexDirection: { xl: 'column', base: 'row' },
    justifyContent: { base: 'flex-end' },
    alignItems: 'center',
    gap: { base: '0px', xl: '24px' },
    position: { base: 'none', xl: 'fixed' },
    right: { base: 'none', xl: '0px' },
    top: { base: '40px', xl: '104px' },
};

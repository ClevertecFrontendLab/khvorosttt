import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const NavbarFooterStyle: SystemStyleObject = {
    flexDirection: 'column',
    p: '0px 24px 32px 24px',
    gap: '15px',
};

export const VersionStyle: SystemStyleObject = {
    fontSize: '12px',
    fontWeight: 500,
    color: 'rgba(0, 0, 0, 0.24)',
};

export const LawStyle: SystemStyleObject = {
    fontSize: '12px',
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.64)',
    whiteSpace: 'pre-line',
};

export const OutButtonStyle: SystemStyleObject = {
    fontSize: '12px',
    fontWeight: 600,
    color: 'black',
    variant: 'ghost',
    h: '16px',
    p: '0',
    alignSelf: 'flex-start',
};

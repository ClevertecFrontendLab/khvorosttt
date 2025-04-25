import { SystemStyleObject } from '@chakra-ui/react';

export const newRecipeheaderStyle: SystemStyleObject = {
    fontWeight: 500,
    fontSize: { '3xl': '48px', '2xl': '36px', base: '24px' },
};

export const siderButtonPrevStyle: SystemStyleObject = {
    position: 'absolute',
    top: '40%',
    left: 0,
    zIndex: 1,
    bg: 'black',
    display: { base: 'none', xl: 'flex' },
};

export const siderButtonNextStyle: SystemStyleObject = {
    position: 'absolute',
    top: '40%',
    right: 0,
    zIndex: 1,
    bg: 'black',
    display: { base: 'none', xl: 'flex' },
};

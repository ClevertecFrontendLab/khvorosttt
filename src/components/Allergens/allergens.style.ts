import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const AddNewAllergensBtnStyle: SystemStyleObject = {
    minW: '24px',
    h: '24px',
    borderRadius: '50px',
    bg: '#2DB100',
};

export const AddNewStyle: SystemStyleObject = {
    p: '8px 8px 8px 24px',
    alignItems: 'center',
    gap: '8px',
    justifyContent: 'space-between',
};

export const TagStyle: SystemStyleObject = {
    border: '1px solid #b1ff2e',
    borderRadius: '6px',
    p: '4px 8px',
    color: '#2db100',
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: 'text',
};

export const MenuButtonStyle: SystemStyleObject = {
    variant: 'outline',
    bg: 'transparent',
    fontWeight: 400,
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.64)',
    fontFamily: 'text',
    w: '269px',
    h: '100%',
    p: '8px 16px',
    _active: { bg: 'white', border: '1px solid #b1ff2e' },
};

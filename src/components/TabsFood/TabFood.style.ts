import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const TabFoodStyle: SystemStyleObject = {
    bg: 'transparent',
    width: '100%',
    variant: 'unstyled',
};

export const TabFoodListStyle: SystemStyleObject = {
    overflowY: 'hidden',
    overflowX: 'auto',
    h: '40px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
    position: 'relative',
    margin: '0px 0px 12px 0px',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
        display: 'none',
    },
};

export const TabFoodListItemStyle: SystemStyleObject = {
    color: '#134b00',
    fontFamily: 'text',
    fontWeight: 500,
    fontSize: { xl: '16px', base: '14px' },
    p: '8px 16px',
    whiteSpace: 'nowrap',
    _selected: {
        color: '#2db100',
    },
    _hover: {
        background: 'transparent',
        color: '#2db100',
        borderColor: 'transparent',
    },
    _active: {
        background: 'transparent',
        color: '#134b00',
        borderColor: 'transparent',
    },
    _focus: {
        boxShadow: 'none',
        outline: 'none',
    },
};

export const TabFoodIndicatorStyle: SystemStyleObject = {
    bottom: '-1px',
    height: '2px',
    bg: '#2db100',
};

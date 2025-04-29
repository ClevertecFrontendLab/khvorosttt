import { SystemStyleObject } from '@chakra-ui/react';

export const CaloriesStyle: SystemStyleObject = {};

export const BoxStyle: SystemStyleObject = {
    w: { base: '100%', md: '173px', xl: '132px', '3xl': '149px' },
    borderRadius: '16px',
    border: '1px solid rgba(0, 0, 0, 0.08)',
    p: '16px',
    alignItems: 'center',
    justifyContent: { base: 'space-between', ms: 'initial' },
    gap: { base: '4px', md: '12px' },
};

export const sectionNameStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.48)',
    fontWeight: 400,
    w: { base: '37%', ms: 'initial' },
};

export const sectionValueStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontSize: '36px',
    color: '#134b00',
    fontWeight: 500,
};

export const sectionMeasureUnitStyle: SystemStyleObject = {
    fontFamily: 'text',
    fontSize: '14px',
    color: 'rgba(0, 0, 0, 0.92)',
    fontWeight: 600,
};

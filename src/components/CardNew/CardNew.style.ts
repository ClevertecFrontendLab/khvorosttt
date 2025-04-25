import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const CardStyle: SystemStyleObject = {
    maxW: 'sm',
    borderRadius: '8px',
    padding: 0,
    overflow: 'hidden',
    fontFamily: 'text',
    h: '100%',
    minH: '220px',
};

export const CardBodyStyle: SystemStyleObject = {
    justifyContent: 'space-between',
    flex: '1',
    padding: { base: '8px 8px 4px 8px', lg: '16px 24px 20px 24px' },
};

export const CardHeadStyle: SystemStyleObject = {
    fontSize: { base: '16px', lg: '18px', '2xl': '20px' },
    noOfLines: { base: 2, md: 1 },
    fontWeight: 500,
    fontFamily: 'text',
};

export const CardTagStyle: SystemStyleObject = {
    display: 'flex',
    p: { base: '2px 4px', ms: '2px 8px' },
    bg: '#d7ff94',
    alignItems: 'center',
    borderRadius: '4px',
    gap: '3px',
};

export const CardTagMobileStyle: SystemStyleObject = {
    justifyContent: { lg: 'space-between' },
    display: { base: 'flex', '2xl': 'none' },
    gap: { base: '30px' },
    w: '100%',
    position: { base: 'absolute', '2xl': 'relative' },
    top: { base: '8px', xl: 'initial' },
    left: { base: '8px', xl: 'initial' },
    zIndex: 10,
};

export const CardTagMobileElementsStyle: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'column',
    gap: '3px',
};

export const MarkerStyle: SystemStyleObject = {
    display: 'flex',
    bg: '#d7ff94',
    borderRadius: '4px',
    p: { base: '2px 4px', ms: '2px 8px' },
    gap: '3px',
    w: 'fit-content',
};

import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const CardStyle: SystemStyleObject = {
    maxW: 'sm',
    borderRadius: '8px',
    padding: 0,
    overflow: 'hidden',
    fontFamily: 'text',
    h: '100%',
};

export const CardBodyStyle: SystemStyleObject = {
    justifyContent: 'space-between',
    flex: '1',
    padding: { base: '8px 8px 4px 8px', lg: '16px 24px 20px 24px' },
};

export const CardHeadStyle: SystemStyleObject = {
    size: 'md',
    fontSize: { base: '16px', lg: '18px', '2xl': '20px' },
    noOfLines: 2,
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
    display: { base: 'flex', lg: 'none' },
    gap: { base: '30px' },
    w: '100%',
    position: { base: 'absolute', lg: 'relative' },
    top: { base: '8px', lg: 'initial' },
    left: { base: '8px', lg: 'initial' },
    zIndex: 1,
};

export const CardTagMobileElementsStyle: SystemStyleObject = {
    display: 'flex',
    p: { base: '2px 4px', ms: '2px 8px' },
    bg: '#d7ff94',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '4px',
    gap: '3px',
};

import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const CardStyle: SystemStyleObject = {
    overflow: 'hidden',
    variant: 'outline',
    maxH: '244px',
    w: '100%',
    position: 'relative',
    transition: 'all 0.2s ease',
    _hover: {
        boxShadow: 'lg',
    },
};

export const CardImageStyle: SystemStyleObject = {
    objectFit: 'cover',
    w: '100%',
    maxW: { base: '158px', '2xl': '346px' },
};

export const MarkerInteractionsStyle: SystemStyleObject = {
    justifyContent: { lg: 'space-between' },
    gap: { base: '30px' },
    w: '100%',
    position: { base: 'absolute', lg: 'relative' },
    top: { base: '8px', lg: 'initial' },
    left: { base: '8px', lg: 'initial' },
    paddingRight: '20px',
    zIndex: 1,
};

export const MarkerStyle: SystemStyleObject = {
    display: 'flex',
    padding: '2px 8px',
    bg: ' #ffffd3',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '4px',
    gap: '5px',
};

export const CardBodyStyle: SystemStyleObject = {
    padding: 0,
    mt: '25px',
    w: '100%',
    gap: '10px',
    display: 'flex',
    flexDirection: 'column',
};

export const CardBodyHeadingStyle: SystemStyleObject = {
    fontSize: { base: '16px', '2xl': '20px' },
    fontWeight: 500,
    whiteSpace: { base: 'wrap', lg: 'nowrap' },
    noOfLines: 2,
    fontFamily: 'text',
};

export const SaveButtonStyle: SystemStyleObject = {
    bg: 'transparent',
    color: 'black',
    border: '1px solid rgba(0, 0, 0, 0.48)',
    p: '0px 6px',
    gap: '5px',
    w: { base: '24px', md: 'auto' },
    h: { base: '24px', md: '32px' },
};

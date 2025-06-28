import type { SystemStyleObject } from '@chakra-ui/styled-system';

export const CardStyle: SystemStyleObject = {
    overflow: 'hidden',
    variant: 'outline',
    maxH: '244px',
    h: { base: '128px', lg: '244px' },
    w: { base: '328px', md: '356px', lg: '468px', '2xl': '880px', '3xl': '668px' },
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

export const CardNoneImageStyle: SystemStyleObject = {
    alignItems: 'center',
    justifyContent: 'center',
    minW: { base: '158px', '2xl': '346px' },
    bg: 'rgba(0, 0, 0, 0.08)',
};

export const MarkerInteractionsStyle: SystemStyleObject = {
    justifyContent: { lg: 'space-between' },
    gap: { base: '30px' },
    w: '100%',
    position: { base: 'absolute', xl: 'relative' },
    top: { base: '8px', xl: 'initial' },
    left: { base: '8px', xl: 'initial' },
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
    maxW: { base: '150px', xl: 'initial' },
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

export const RecipeCardButtonStyle: SystemStyleObject = {
    color: 'black',
    p: '0px 12px',
    h: { base: '24px', md: '32px' },
    border: '1px solid rgba(0, 0, 0, 0.48)',
    borderRadius: '6px',
    fontFamily: 'text',
    fontSize: { base: '12px', lg: '14px' },
    fontWeight: 600,
    variant: 'outline',
};

export const DraftTextStyle: SystemStyleObject = {
    borderRadius: '4px',
    p: '2px 8px',
    bg: 'rgba(0, 0, 0, 0.06)',
    fontFamily: 'text',
    fontSize: '14px',
    fontWeight: 400,
};

export const DraftCardButtonStyle: SystemStyleObject = {
    bg: 'black',
    color: 'white',
    p: '0px 12px',
    h: { base: '24px', md: '32px' },
    border: '1px solid rgba(0, 0, 0, 0.08)',
    borderRadius: '6px',
    fontFamily: 'text',
    fontSize: { base: '12px', lg: '14px' },
    fontWeight: 600,
};

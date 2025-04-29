import { SystemStyleObject } from '@chakra-ui/react';

export const RecipeDescriptionStyle: SystemStyleObject = {
    flexDirection: 'column',
    gap: '40px',
    p: { base: '0px', '2xl': '56px 0px 32px 0px' },
    w: '100%',
    alignItems: 'center',
};

export const RecipeImageStyle: SystemStyleObject = {
    borderRadius: '8px',
    w: { base: '328px', md: '232px', lg: '353px', '3xl': '553px' },
    h: { base: '232px', lg: '410px' },
    objectFit: 'cover',
};

export const RecipeHeadingStyle: SystemStyleObject = {
    fontSize: { base: '24px', '2xl': '48px' },
    fontWeight: 700,
    fontFamily: 'text',
};

export const TimeStyle: SystemStyleObject = {
    bg: 'rgba(0, 0, 0, 0.06)',
    p: '2px 8px',
    borderRadius: '4px',
    alignItems: 'center',
    gap: '10px',
    h: '24px',
    alignSelf: { base: 'flex-start', md: 'flex-end', xl: 'flex-start', '2xl': 'flex-end' },
};

export const ButtonStyle: SystemStyleObject = {
    p: { base: '0px 8px', '2xl': '0px 12px', '3xl': '0px 24px' },
    fontWeight: 600,
    fontSize: { base: '12px', '2xl': '14px', '3xl': '18px' },
    h: { base: '24px', lg: '32px', '3xl': '48px' },
};

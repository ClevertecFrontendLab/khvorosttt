import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
    base: '0px', // 0px
    sm: '360px',
    ms: '670px',
    md: '48em', // ~768px
    lg: '62em', // ~992px
    xl: '1232px',
    '2xl': '1440px',
    '3xl': '1920px',
};

const theme = extendTheme({
    breakpoints,
    fonts: {
        text: `'Inter', sans-serif`,
    },
    colors: {
        headerBg: '#ffffd3',
    },
    components: {
        Progress: {
            baseStyle: {
                filledTrack: {
                    bg: '#c4ff61',
                },
            },
        },
    },
});

export default theme;

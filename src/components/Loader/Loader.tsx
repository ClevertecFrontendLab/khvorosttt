import { Box, Center, Spinner } from '@chakra-ui/react';

import { LoaderSpinnerStyle, LoaderStyle } from './loader.style';

export function Loader() {
    return (
        <Box sx={LoaderStyle}>
            <Center height='100%'>
                <Box sx={LoaderSpinnerStyle}>
                    <Spinner size='xl' data-test-id='app-loader' pointerEvents='auto' />
                </Box>
            </Center>
        </Box>
    );
}

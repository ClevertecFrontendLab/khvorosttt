import { Box, Spinner } from '@chakra-ui/react';

import { LoaderSpinnerStyle } from '../Loader/loader.style';

export function SearchLoader() {
    return (
        <Box sx={LoaderSpinnerStyle}>
            <Spinner size='xl' data-test-id='loader-search-block' />
        </Box>
    );
}

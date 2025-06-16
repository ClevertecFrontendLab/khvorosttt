import { Box, Spinner } from '@chakra-ui/react';

import { LoaderSpinnerStyle } from '../Loader/loader.style';

interface SmallLoaderProps {
    testId: string;
}

export function SmallLoader({ testId }: SmallLoaderProps) {
    return (
        <Box sx={LoaderSpinnerStyle} position='absolute' display='flex' alignSelf='center'>
            <Spinner size='xl' data-test-id={`${testId}`} />
        </Box>
    );
}

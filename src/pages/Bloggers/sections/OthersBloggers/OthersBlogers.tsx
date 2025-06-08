import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, useBreakpointValue } from '@chakra-ui/react';

import { bloggerI } from '~/interfaces/bloggerI';

import { BloggerCard } from './BloggerCard';

interface OthersBloggersProps {
    bloggers: bloggerI[];
    showAll: boolean;
    setShowAll: (value: boolean) => void;
}

export function OthersBloggers({ bloggers, showAll, setShowAll }: OthersBloggersProps) {
    const defaultLimit = useBreakpointValue({
        base: 8,
        xl: 9,
    });
    const displayLimit = showAll ? bloggers.length : defaultLimit;
    return (
        <Flex
            flexDirection='column'
            borderRadius='16px'
            p='24px'
            bg='rgba(0, 0, 0, 0.04)'
            gap='24px'
            data-test-id='blogs-others-box'
        >
            <Flex wrap='wrap' gap='16px' justifyContent='center' data-test-id='blogs-others-grid'>
                {bloggers.slice(0, displayLimit).map((blogger) => (
                    <BloggerCard blogger={blogger} />
                ))}
            </Flex>
            <Button
                variant='link'
                rightIcon={showAll ? <ArrowBackIcon /> : <ArrowForwardIcon />}
                fontSize='18px'
                fontWeight={600}
                color='black'
                p='0px 16px'
                w='149px'
                h='40px'
                borderRadius='6px'
                alignSelf='center'
                onClick={() => setShowAll(!showAll)}
                data-test-id='blogs-others-button'
            >
                {showAll ? 'Свернуть' : 'Все авторы'}
            </Button>
        </Flex>
    );
}

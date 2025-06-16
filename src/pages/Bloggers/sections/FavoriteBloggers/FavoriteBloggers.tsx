import { Flex, Heading } from '@chakra-ui/react';

import { bloggerI } from '~/interfaces/bloggerI';

import { FavoriteCard } from './FavoriteCard';

interface FavoriteBloggersProps {
    bloggers: bloggerI[];
}

export function FavoriteBloggers({ bloggers }: FavoriteBloggersProps) {
    return (
        <Flex
            w='100%'
            bg='#c4ff61'
            borderRadius='16px'
            p='24px'
            flexDirection='column'
            gap='16px'
            data-test-id='blogs-favorites-box'
        >
            <Heading
                as='h2'
                fontWeight={{ base: 500, lg: 400 }}
                fontSize={{ base: '24px', lg: '36px' }}
                fontFamily='text'
                paddingLeft={{ base: '0px', lg: '16px' }}
            >
                Избранные блоги
            </Heading>
            <Flex
                gap='16px'
                wrap='wrap'
                justifyContent='center'
                data-test-id='blogs-favorites-grid'
            >
                {bloggers.map((blogger) => (
                    <FavoriteCard blogger={blogger} />
                ))}
            </Flex>
        </Flex>
    );
}

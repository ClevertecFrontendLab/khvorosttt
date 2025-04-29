import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { AuthorType, PostCard } from '~/components/PostCard/PostCard';

interface CookingBlog {
    data: AuthorType[];
}

export function CookingBlog({ data }: CookingBlog) {
    return (
        <Flex bg='#c4ff61' borderRadius='16px' p='24px' gap='24px' flexDirection='column'>
            <Flex justifyContent='space-between' alignItems='center'>
                <Text
                    as='h3'
                    fontWeight={{ '3xl': 400, base: 500 }}
                    fontSize={{ base: '24px', '3xl': '36px', '2xl': '30px' }}
                >
                    Кулинарные блоги
                </Text>
                <Button
                    display={{ base: 'none', lg: 'block' }}
                    variant='link'
                    rightIcon={<ArrowForwardIcon />}
                    fontSize={{ base: '16px', '3xl': '18px' }}
                    fontWeight={600}
                    color='black'
                    p='0px 16px'
                    w='149px'
                    h='40px'
                    borderRadius='6px'
                >
                    Все авторы
                </Button>
            </Flex>
            <Grid
                templateColumns={{ base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' }}
                w='100%'
                gap='16px'
            >
                {data.map((item, index) => (
                    <GridItem key={index} colSpan={{ base: 4, sm: 4 }}>
                        <PostCard data={item.data} />
                    </GridItem>
                ))}
            </Grid>
            <Button
                display={{ base: 'block', lg: 'none' }}
                variant='link'
                fontSize={{ base: '16px', '3xl': '18px' }}
                fontWeight={600}
                color='black'
                rightIcon={<ArrowForwardIcon />}
                w='149px'
                h='40px'
                borderRadius='6px'
            >
                Все авторы
            </Button>
        </Flex>
    );
}

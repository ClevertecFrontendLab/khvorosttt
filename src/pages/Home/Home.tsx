import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { CardJuiciest } from '~/components/CardJuiciest/CardJuiciest';
import { CardNew } from '~/components/CardNew/CardNew';
import { PostCard } from '~/components/PostCard/PostCard';
import { Search } from '~/components/Search/Search';
import authors from '~/data/authorsPosts.json';
import juiciest from '~/data/juiciest.json';
import newData from '~/data/new.json';
import shortInfo from '~/data/vegan.json';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';

export function Home() {
    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px'>
                <Search />
                <Box>
                    <Text as='h3' fontWeight={500} fontSize='48px'>
                        Новые рецепты
                    </Text>
                    <Box display='flex' gap='24px' overflow='hidden' w='100%'>
                        {newData.map((item, index) => (
                            <Box
                                key={index}
                                flex='0 0 auto'
                                w={{ base: '50%', ms: '30%', lg: '22%', xl: '24%' }}
                            >
                                <CardNew data={item.data} />
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box>
                    <Text as='h3' fontWeight={500} fontSize='48px'>
                        Самое сочное
                    </Text>
                    <Grid
                        templateColumns={{ base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' }}
                        w='100%'
                        gap='24px'
                    >
                        {juiciest.map((item, index) => (
                            <GridItem key={index} colSpan={{ base: 4, sm: 6, xl: 12, '3xl': 6 }}>
                                <CardJuiciest data={item.data} />
                            </GridItem>
                        ))}
                    </Grid>
                </Box>
                <Flex bg='#c4ff61' borderRadius='16px' p='24px' gap='24px' flexDirection='column'>
                    <Flex justifyContent='space-between' alignItems='center'>
                        <Text as='h3' fontWeight={500} fontSize='48px'>
                            Кулинарные блоги
                        </Text>
                        <Button
                            display={{ base: 'none', lg: 'block' }}
                            variant='link'
                            rightIcon={<ArrowForwardIcon />}
                        >
                            Все авторы
                        </Button>
                    </Flex>
                    <Grid
                        templateColumns={{ base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' }}
                        w='100%'
                        gap='16px'
                    >
                        {authors.map((item, index) => (
                            <GridItem key={index} colSpan={{ base: 4, sm: 4 }}>
                                <PostCard data={item.data} />
                            </GridItem>
                        ))}
                    </Grid>
                    <Button
                        display={{ base: 'block', lg: 'none' }}
                        variant='link'
                        rightIcon={<ArrowForwardIcon />}
                    >
                        Все авторы
                    </Button>
                </Flex>
                <CategoryInfo
                    name={shortInfo.name}
                    description={shortInfo.description}
                    data={shortInfo.data}
                />
            </Flex>
        </Box>
    );
}

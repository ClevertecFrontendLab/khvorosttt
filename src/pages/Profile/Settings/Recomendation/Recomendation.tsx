import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

import together from '~/assets/images/Together.png';
import { CardJuiciest } from '~/components/CardJuiciest/CardJuiciest';
import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { FollowersIcon } from '~/components/Icons/Followers';
import { LikeIcon } from '~/components/Icons/LikeIcon';
import { recipeI } from '~/interfaces/recipeI';
import { recomendedText } from '~/pages/Bloggers/sections/utils';

export interface RecomendationProps {
    bookmarks: number;
    people: number;
    recomendationCount: number;
    recipesWithRecommendations: recipeI[];
}

export function Recomendation({
    bookmarks,
    people,
    recomendationCount,
    recipesWithRecommendations,
}: RecomendationProps) {
    return (
        <Flex
            data-test-id='settings-recommendation-info-block'
            flexDirection='column'
            gap={{ base: '16px', lg: '40px' }}
        >
            <Flex
                w='100%'
                bg='#d7ff94'
                borderRadius='16px'
                p={{ base: '24px 16px 16px 16px', md: '24px 32px' }}
                flexDirection={{ base: 'column', md: 'row' }}
                alignItems='center'
                position='relative'
            >
                <Image src={together} w={{ base: '108px', lg: '206px' }} />
                <Flex flexDirection='column' gap='24px'>
                    <Text
                        fontFamily='text'
                        fontWeight={600}
                        fontSize={{ base: '20px', lg: '36px' }}
                    >
                        {' '}
                        Теперь вы можете рекомендовать рецепты других авторов
                    </Text>
                    <Flex flexDirection='column' gap='8px'>
                        <Text fontFamily='text' fontWeight={500} fontSize='16px'>
                            Это можно будет сделать с помощью кнопки
                        </Text>
                        <Button
                            w='fit-content'
                            color='white'
                            leftIcon={<LikeIcon color='white' />}
                            bg='rgba(0, 0, 0, 0.92)'
                            p='0px 8px'
                            borderRadius='6px'
                        >
                            {' '}
                            Рекомендовать рецепт
                        </Button>
                    </Flex>
                </Flex>
                <Flex
                    gap='8px'
                    position='absolute'
                    right={{ base: '16px', md: '24px' }}
                    top={{ base: '16px', md: '24px' }}
                >
                    <Box display='flex' alignItems='center' gap='5px'>
                        <BookmarkIcon w='12px' h='12px' />
                        <Text color='#2db100' fontWeight={600} fontSize='12px'>
                            {bookmarks}
                        </Text>
                    </Box>
                    <Box display='flex' alignItems='center' gap='5px'>
                        <FollowersIcon w='14px' h='12px' />
                        <Text color='#2db100' fontWeight={600} fontSize='12px'>
                            {people}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <Flex flexDirection='column' gap='10px'>
                <Flex gap='5px' alignItems='center'>
                    <LikeIcon color='black' />
                    <Text color='#2db100' fontFamily='text' fontWeight={600} fontSize='12px'>
                        {recomendedText(recomendationCount)}
                    </Text>
                </Flex>
                <Flex>
                    {recipesWithRecommendations.map((recipe, index) => (
                        <CardJuiciest data={recipe} index={index} key={recipe._id} />
                    ))}
                </Flex>
            </Flex>
        </Flex>
    );
}

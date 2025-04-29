import { TimeIcon } from '@chakra-ui/icons';
import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { MarkerStyle } from '~/components/CardNew/CardNew.style';
import { CategoryMarker } from '~/components/CategoryMarker/CategoryMarker';
import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { LikeSmileIcon } from '~/components/Icons/LikeSmile';
import { Interactions } from '~/components/Interactions/Interactions';
import { recipeI } from '~/data/interface/data';

import {
    ButtonStyle,
    RecipeDescriptionStyle,
    RecipeHeadingStyle,
    RecipeImageStyle,
    TimeStyle,
} from './RecipeDescription.style';

export function RecipeDescription(data: recipeI) {
    return (
        <Flex sx={RecipeDescriptionStyle}>
            <Flex
                direction={{ base: 'column', ms: 'row' }}
                gap={{ base: '16px', '2xl': '24px' }}
                p='0px 10px'
            >
                <Image src={data.image} sx={RecipeImageStyle} />
                <Flex direction='column' justifyContent='space-between' gap='24px'>
                    <Flex direction='column' gap='24px'>
                        <Flex justifyContent='space-between'>
                            <Flex wrap='wrap' gap='5px'>
                                <CategoryMarker style={MarkerStyle} data={data} />
                            </Flex>
                            <Flex alignSelf='self-start'>
                                <Interactions {...data} />
                            </Flex>
                        </Flex>
                        <Flex direction='column' gap='24px'>
                            <Text as='h1' sx={RecipeHeadingStyle}>
                                {data.title}
                            </Text>
                            <Text fontSize='14px' fontFamily='text'>
                                {data.description}
                            </Text>
                        </Flex>
                    </Flex>
                    <Flex
                        justifyContent='space-between'
                        direction={{ base: 'column', md: 'row', xl: 'column', '2xl': 'row' }}
                        gap='12px'
                    >
                        <Flex sx={TimeStyle}>
                            <TimeIcon />
                            <Text fontFamily='text' fontSize='14px'>
                                {data.time}
                            </Text>
                        </Flex>
                        <Flex gap='16px'>
                            <Button
                                leftIcon={<LikeSmileIcon />}
                                colorScheme='gray'
                                variant='outline'
                                sx={ButtonStyle}
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                bg='#b1ff2e'
                                color='#000'
                                leftIcon={<BookmarkIcon />}
                                sx={ButtonStyle}
                            >
                                Сохранить в закладки
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

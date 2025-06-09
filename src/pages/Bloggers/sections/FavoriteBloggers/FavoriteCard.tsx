import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { FollowersIcon } from '~/components/Icons/Followers';
import {
    CardDescriptionStyle,
    CardEmailStyle,
    CardHeadingStyle,
} from '~/components/PostCard/PostCard.style';
import { bloggerI } from '~/interfaces/bloggerI';

import { newRecipeText } from '../utils';
import { CardStyle, NewRecipeStyle, ReadButtonStyle, RecipeButtonStyle } from './card.style';

export type FavoriteCardProps = {
    blogger: bloggerI;
};

export function FavoriteCard({ blogger }: FavoriteCardProps) {
    const navigate = useNavigate();
    return (
        <Card sx={CardStyle} data-test-id='blogs-card'>
            <CardHeader
                padding={{ base: '24px 16px 8px 16px', lg: '24px 24px 16px 24px' }}
                w='100%'
            >
                <HStack w='100%'>
                    <Avatar name={`${blogger.firstName} ${blogger.lastName}`} />
                    <Stack gap='2px' w='100%' overflow='hidden'>
                        <Heading
                            size='sm'
                            sx={CardHeadingStyle}
                            isTruncated
                            data-test-id='blogs-card-name'
                        >
                            {blogger.firstName} {blogger.lastName}
                        </Heading>
                        <Text sx={CardEmailStyle} data-test-id='blogs-card-login'>
                            @{blogger.login}
                        </Text>
                    </Stack>
                </HStack>
            </CardHeader>
            <CardBody padding='8px 16px 12px 16px' w='100%'>
                <Text sx={CardDescriptionStyle} isTruncated data-test-id='blogs-card-notes-text'>
                    {blogger.notes.length ? blogger.notes[0].text : ''}
                </Text>
            </CardBody>
            <CardFooter justifyContent='space-between' padding='12px 16px 12px 16px'>
                <Flex gap='8px'>
                    <Button
                        variant='solid'
                        sx={RecipeButtonStyle}
                        data-test-id='blogs-card-recipes-button'
                        onClick={() => navigate(`${blogger._id}`)}
                    >
                        Рецепты
                    </Button>
                    <Button
                        variant='outline'
                        sx={ReadButtonStyle}
                        data-test-id='blogs-card-notes-button'
                        onClick={() => navigate(`${blogger._id}#notes`)}
                    >
                        Читать
                    </Button>
                </Flex>
                <Flex gap='8px'>
                    <Box display='flex' alignItems='center' gap='5px'>
                        <BookmarkIcon w='12px' h='12px' />
                        <Text color='#2db100' fontWeight={600} fontSize='12px'>
                            {blogger.bookmarksCount}
                        </Text>
                    </Box>
                    <Box display='flex' alignItems='center' gap='5px'>
                        <FollowersIcon w='14px' h='12px' />
                        <Text color='#2db100' fontWeight={600} fontSize='12px'>
                            {blogger.subscribersCount}
                        </Text>
                    </Box>
                </Flex>
            </CardFooter>
            <Box sx={NewRecipeStyle} data-test-id='blogs-card-new-recipes-badge'>
                {newRecipeText(blogger.newRecipesCount)}
            </Box>
        </Card>
    );
}

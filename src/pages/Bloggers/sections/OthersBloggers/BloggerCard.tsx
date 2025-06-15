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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { useToggleSubscriptionMutation } from '~/api/authApi';
import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { FollowIcon } from '~/components/Icons/Follow';
import { FollowedIcon } from '~/components/Icons/Followed';
import { FollowersIcon } from '~/components/Icons/Followers';
import {
    CardDescriptionStyle,
    CardEmailStyle,
    CardHeadingStyle,
} from '~/components/PostCard/PostCard.style';
import { SmallLoader } from '~/components/SmallLoader/SmallLoader';
import { bloggerI } from '~/interfaces/bloggerI';
import { setNotification } from '~/services/features/notificationSlice';
import { getUserIdFromToken } from '~/services/utils';

import { CardStyle, FollowedStyle, FollowStyle, ReadButtonStyle } from './card.style';

export type BloggerCardProps = {
    blogger: bloggerI;
};

export function BloggerCard({ blogger }: BloggerCardProps) {
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentUserId = getUserIdFromToken();

    const handleFollowButton = () => {
        toggleSubscription({
            fromUserId: currentUserId ? currentUserId : '',
            toUserId: blogger._id,
        })
            .unwrap()
            .catch(() => {
                dispatch(
                    setNotification({
                        title: 'Ошибка сервера',
                        typeN: 'error',
                        description: 'Попробуйте немного позже.',
                    }),
                );
            });
    };

    return (
        <Card sx={CardStyle}>
            {isLoading && <SmallLoader testId='mobile-loader' />}
            <CardHeader padding={{ base: '8px', lg: '24px 24px 16px 24px' }} w='100%'>
                <HStack w='100%'>
                    <Avatar name={`${blogger.firstName} ${blogger.lastName}`} />
                    <Stack gap='2px' w='100%' overflow='hidden'>
                        <Heading size='sm' sx={CardHeadingStyle} isTruncated>
                            {blogger.firstName} {blogger.lastName}
                        </Heading>
                        <Text sx={CardEmailStyle}>@{blogger.login}</Text>
                    </Stack>
                </HStack>
            </CardHeader>
            <CardBody padding={{ base: '8px', lg: '8px 16px 12px 16px' }} w='100%'>
                <Text sx={CardDescriptionStyle} isTruncated fontSize='14px'>
                    {blogger.notes.length ? blogger.notes[0].text : ''}
                </Text>
            </CardBody>
            <CardFooter
                justifyContent='space-between'
                p={{ base: '8px', lg: '12px 24px 20px 24px' }}
                justifySelf='flex-end'
                alignItems='end'
                flexDirection={{ base: 'column-reverse' }}
                gap='8px'
            >
                <Flex gap='8px'>
                    <Button
                        variant={blogger.isFavorite ? 'outline' : 'solid'}
                        leftIcon={blogger.isFavorite ? <FollowedIcon /> : <FollowIcon />}
                        sx={blogger.isFavorite ? FollowedStyle : FollowStyle}
                        onClick={handleFollowButton}
                        data-test-id={
                            blogger.isFavorite ? 'blog-toggle-unsubscribe' : 'blog-toggle-subscribe'
                        }
                    >
                        {blogger.isFavorite ? 'Вы подписаны' : 'Подписаться'}
                    </Button>
                    <Button
                        variant='outline'
                        sx={ReadButtonStyle}
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
        </Card>
    );
}

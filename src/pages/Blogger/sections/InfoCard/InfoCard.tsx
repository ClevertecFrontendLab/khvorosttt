import { Avatar, Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { Navigate, useParams } from 'react-router';

import { useGetUserByIdQuery, useToggleSubscriptionMutation } from '~/api/authApi';
import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { FollowIcon } from '~/components/Icons/Follow';
import { FollowedIcon } from '~/components/Icons/Followed';
import { FollowersIcon } from '~/components/Icons/Followers';
import { SmallLoader } from '~/components/SmallLoader/SmallLoader';
import { setNotification } from '~/services/features/notificationSlice';
import { getUserIdFromToken } from '~/services/utils';

import { FollowedStyle, FollowStyle } from '../../../Bloggers/sections/OthersBloggers/card.style';
import { AvatarStyle, ContentStyle, InfoCardStyle, LoginStyle, NameStyle } from '../infoCard.style';

export function InfoCard() {
    const { bloggerId } = useParams();
    const currentUserId = getUserIdFromToken();
    const { data: blogger, isError } = useGetUserByIdQuery({
        userId: bloggerId ? bloggerId : '',
        currentUserId: currentUserId ? currentUserId : '',
    });
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const dispatch = useDispatch();

    if (isError) {
        return <Navigate to='/not-found' />;
    }

    const handleFollowButton = () => {
        toggleSubscription({
            fromUserId: currentUserId ? currentUserId : '',
            toUserId: blogger ? blogger.bloggerInfo._id : '',
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
        <Flex sx={InfoCardStyle} data-test-id='blogger-user-info-box'>
            {isLoading && <SmallLoader testId='mobile-loader' />}
            <Avatar
                name={`${blogger?.bloggerInfo.firstName} ${blogger?.bloggerInfo.lastName}`}
                sx={AvatarStyle}
            />
            <Flex sx={ContentStyle}>
                <Heading as='h1' sx={NameStyle} data-test-id='blogger-user-info-name'>
                    {blogger?.bloggerInfo.firstName} {blogger?.bloggerInfo.lastName}
                </Heading>
                <Text as='h3' sx={LoginStyle} data-test-id='blogger-user-info-login'>
                    @{blogger?.bloggerInfo.login}
                </Text>
                <Flex w='100%' justifyContent='space-between'>
                    <Button
                        variant={blogger?.isFavorite ? 'outline' : 'solid'}
                        leftIcon={blogger?.isFavorite ? <FollowedIcon /> : <FollowIcon />}
                        sx={blogger?.isFavorite ? FollowedStyle : FollowStyle}
                        onClick={handleFollowButton}
                        data-test-id={
                            blogger?.isFavorite
                                ? 'blog-toggle-unsubscribe'
                                : 'blog-toggle-subscribe'
                        }
                    >
                        {blogger?.isFavorite ? 'Вы подписаны' : 'Подписаться'}
                    </Button>
                    <Flex gap='8px'>
                        <Box display='flex' alignItems='center' gap='5px'>
                            <BookmarkIcon w='12px' h='12px' />
                            <Text
                                color='#2db100'
                                fontWeight={600}
                                fontSize='12px'
                                data-test-id='blogger-followers-bookmarks'
                            >
                                {blogger?.totalBookmarks}
                            </Text>
                        </Box>
                        <Box display='flex' alignItems='center' gap='5px'>
                            <FollowersIcon w='14px' h='12px' />
                            <Text
                                color='#2db100'
                                fontWeight={600}
                                fontSize='12px'
                                data-test-id='blogger-followers-count'
                            >
                                {blogger?.totalSubscribers}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

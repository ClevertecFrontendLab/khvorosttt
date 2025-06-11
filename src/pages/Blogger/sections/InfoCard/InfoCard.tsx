import { Avatar, Box, Button, Flex, Heading, Text, Tooltip } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
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
import { AvatarStyle, ContentStyle, InfoCardStyle, LoginStyle, NameStyle } from './infoCard.style';

export function InfoCard() {
    const { bloggerId } = useParams();
    const currentUserId = getUserIdFromToken();
    const { data: blogger, isError } = useGetUserByIdQuery({
        userId: bloggerId ? bloggerId : '',
        currentUserId: currentUserId ? currentUserId : '',
    });
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(blogger?.isFavorite);

    useEffect(() => {
        setIsFavorite(blogger?.isFavorite);
    }, [blogger?.isFavorite]);

    if (isError) {
        dispatch(
            setNotification({
                title: 'Ошибка сервера',
                typeN: 'error',
                description: 'Попробуйте немного позже.',
            }),
        );
        return <Navigate to='/not-found' />;
    }

    const handleFollowButton = () => {
        toggleSubscription({
            fromUserId: currentUserId ? currentUserId : '',
            toUserId: blogger ? blogger.bloggerInfo._id : '',
        })
            .unwrap()
            .then(() => setIsFavorite((prev) => !prev))
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
                    <Tooltip
                        hasArrow
                        label='Нажмите, если хотите отписаться'
                        bg='black'
                        color='white'
                        data-test-id='blog-tooltip'
                        isDisabled={!isFavorite}
                    >
                        <Button
                            variant={isFavorite ? 'outline' : 'solid'}
                            leftIcon={isFavorite ? <FollowedIcon /> : <FollowIcon />}
                            sx={isFavorite ? FollowedStyle : FollowStyle}
                            onClick={handleFollowButton}
                            data-test-id={
                                isFavorite ? 'blog-toggle-unsubscribe' : 'blog-toggle-subscribe'
                            }
                        >
                            {isFavorite ? 'Вы подписаны' : 'Подписаться'}
                        </Button>
                    </Tooltip>
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

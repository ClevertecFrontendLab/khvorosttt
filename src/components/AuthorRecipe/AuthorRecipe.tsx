import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { useGetUserByIdQuery, useToggleSubscriptionMutation } from '~/api/authApi';
import { FollowedStyle, FollowStyle } from '~/pages/Bloggers/sections/OthersBloggers/card.style';
import { setNotification } from '~/services/features/notificationSlice';
import { getUserIdFromToken } from '~/services/utils';

import { FollowIcon } from '../Icons/Follow';
import { FollowedIcon } from '../Icons/Followed';
import { PeopleIcon } from '../Icons/People';
import { SmallLoader } from '../SmallLoader/SmallLoader';
import { AuthorRecipeStyle } from './authorRecipe.style';

interface AuthorRecipeProps {
    authorId: string;
}

export function AuthorRecipe({ authorId }: AuthorRecipeProps) {
    const currentUserId = getUserIdFromToken();
    const { data: blogger, isError: isErrorUser } = useGetUserByIdQuery(
        {
            userId: authorId,
            currentUserId: currentUserId ? currentUserId : '',
        },
        {
            skip: !authorId || !currentUserId || authorId === currentUserId,
            refetchOnMountOrArgChange: true,
        },
    );
    const [toggleSubscription, { isLoading }] = useToggleSubscriptionMutation();
    const dispatch = useDispatch();
    const [isFavorite, setIsFavorite] = useState(blogger?.isFavorite);

    useEffect(() => {
        setIsFavorite(blogger?.isFavorite);
    }, [blogger?.isFavorite]);

    if (authorId === currentUserId || !blogger?.bloggerInfo) {
        return null;
    }

    if (isErrorUser) {
        dispatch(
            setNotification({
                title: 'Ошибка сервера',
                typeN: 'error',
                description: 'Попробуйте немного позже.',
            }),
        );
        return null;
    }

    const handleFollowButton = () => {
        toggleSubscription({
            fromUserId: currentUserId ? currentUserId : '',
            toUserId: authorId ? authorId : '',
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

    return blogger ? (
        <Flex sx={AuthorRecipeStyle}>
            {isLoading && <SmallLoader testId='mobile-loader' />}
            <Avatar
                name={`${blogger?.bloggerInfo.firstName} ${blogger?.bloggerInfo.lastName}`}
                w='96px'
                h='96px'
            />
            <Flex direction='column' gap='16px' w='100%'>
                <Flex
                    direction={{ base: 'column-reverse', ms: 'row' }}
                    justifyContent='space-between'
                >
                    <Flex direction='column' gap='4px'>
                        <Text fontSize='xl' fontWeight='bold'>
                            {blogger?.bloggerInfo.firstName} {blogger?.bloggerInfo.lastName}
                        </Text>
                        <Text fontSize='sm' color='gray.500'>
                            {blogger?.bloggerInfo.login}
                        </Text>
                    </Flex>
                    <Text alignSelf={{ base: 'flex-end', ms: 'flex-start' }}>Автор рецепта</Text>
                </Flex>
                <Flex justifyContent='space-between' w='100%' alignItems='center'>
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
                    <Flex alignItems='center' p='0px 4px' gap='4px'>
                        <PeopleIcon />
                        <Text>{blogger?.totalSubscribers}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    ) : null;
}

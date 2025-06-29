import { EditIcon } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetCurrentUserInfoQuery, useGetUserStatisticQuery } from '~/api/authApi';

import { bookmarksCount, likesCount } from '../Header/utils';
import { ProfileNotification } from '../ProfileNotification/ProfileNotification';
import { NoteElementStyle, NoteStyle, NotificationAsideStyle } from './NotificationAside.style';

export function NotificationAside() {
    const navigate = useNavigate();
    const { data: user } = useGetCurrentUserInfoQuery();
    const { data: statistic } = useGetUserStatisticQuery();
    return (
        <Flex flexDirection='column' as='aside' sx={NotificationAsideStyle}>
            <ProfileNotification
                recomendation={statistic?.recommendationsCount}
                bookmarks={bookmarksCount(statistic?.bookmarks)}
                people={user ? user.subscribers.length : 0}
                like={likesCount(statistic?.likes)}
            />
            <Button
                sx={NoteElementStyle}
                data-test-id='add-recipe-button'
                variant='none'
                justifySelf='flex-end'
                onClick={() => navigate('new-recipe')}
            >
                <Flex sx={NoteStyle}>
                    <EditIcon color='white' boxSize={6} />
                </Flex>
                <Text color='rgba(0, 0, 0, 0.64)' fontSize='12px' fontWeight={400}>
                    Записать рецепт
                </Text>
            </Button>
        </Flex>
    );
}

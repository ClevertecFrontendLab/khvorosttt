import { SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { bookmarksCount } from '~/components/Header/utils';
import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { FollowersIcon } from '~/components/Icons/Followers';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { statisticI, userI } from '~/interfaces/bloggerI';

import {
    AvatarStyle,
    BoxStyle,
    InfoStyle,
    LikeBookmarkStyle,
    LoginStyle,
    NameStyle,
    SettingButtonStyle,
} from './userInfo.style';

export interface UserProps {
    user: userI | undefined;
    statistic: statisticI | undefined;
}

export function UserInfo({ user, statistic }: UserProps) {
    const navigate = useNavigate();
    return (
        <Flex sx={BoxStyle} data-test-id='user-profile-box'>
            <Avatar
                name={`${user?.firstName} ${user?.lastName}`}
                src={user?.photoLink ? `${IMAGE_BASED_PATH}${user?.photoLink}` : ''}
                sx={AvatarStyle}
            />
            <Flex sx={InfoStyle}>
                <Text sx={NameStyle} data-test-id='user-profile-name'>
                    {user?.firstName} {user?.lastName}
                </Text>
                <Text sx={LoginStyle} data-test-id='user-profile-login'>
                    @{user?.login}
                </Text>
                <Flex gap='8px' data-test-id='user-profile-stats-block'>
                    <Box display='flex' alignItems='center' gap='5px'>
                        <BookmarkIcon w='12px' h='12px' />
                        <Text sx={LikeBookmarkStyle} data-test-id='blogger-followers-bookmarks'>
                            {bookmarksCount(statistic?.bookmarks)}
                        </Text>
                    </Box>
                    <Box display='flex' alignItems='center' gap='5px'>
                        <FollowersIcon w='14px' h='12px' />
                        <Text sx={LikeBookmarkStyle} data-test-id='blogger-followers-count'>
                            {user ? user.subscribers.length : 0}
                        </Text>
                    </Box>
                </Flex>
            </Flex>
            <IconButton
                icon={<SettingsIcon />}
                aria-label='Настройки'
                variant='ghost'
                sx={SettingButtonStyle}
                onClick={() => navigate('settings')}
                data-test-id='settings-button'
            />
        </Flex>
    );
}

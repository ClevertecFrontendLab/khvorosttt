import { Box, Flex, Text } from '@chakra-ui/react';

import { BookmarkIcon } from '../Icons/Bookmark';
import { LikeIcon } from '../Icons/LikeIcon';
import { LikeSmileIcon } from '../Icons/LikeSmile';
import { PeopleIcon } from '../Icons/People';
import { ProfileNotificationStyle } from './ProfileNotification.style';

export type notificationInfo = {
    bookmarks: number;
    people: number;
    like: number;
    recomendation?: number;
};

export function ProfileNotification(props: notificationInfo) {
    return (
        <Flex sx={ProfileNotificationStyle} data-test-id='user-stats-block'>
            {props.people > 100 && props.bookmarks > 200 && (
                <Box display='flex' gap='10px' p='0px 8px' alignItems='center'>
                    <LikeIcon />
                    <Text color='#2db100' fontWeight='600'>
                        {props.recomendation || 0}
                    </Text>
                </Box>
            )}
            <Box display='flex' gap='10px' p='0px 8px' alignItems='center'>
                <BookmarkIcon />
                <Text color='#2db100' fontWeight='600'>
                    {props.bookmarks}
                </Text>
            </Box>
            <Box display='flex' gap='8px' p='0px 8px' alignItems='center'>
                <PeopleIcon />
                <Text color='#2db100' fontWeight='600'>
                    {props.people}
                </Text>
            </Box>
            <Box display='flex' gap='8px' p='0px 8px' alignItems='center'>
                <LikeSmileIcon />
                <Text color='#2db100' fontWeight='600'>
                    {props.like}
                </Text>
            </Box>
        </Flex>
    );
}

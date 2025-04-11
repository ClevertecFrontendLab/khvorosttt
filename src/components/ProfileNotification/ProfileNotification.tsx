import { Box, Flex, Text } from '@chakra-ui/react';

import { BookmarkIcon } from '../Icons/Bookmark';
import { LikeSmileIcon } from '../Icons/LikeSmile';
import { PeopleIcon } from '../Icons/People';

export type notificationInfo = {
    bookmarks: number;
    people: number;
    like: number;
};

export function ProfileNotification(props: notificationInfo) {
    return (
        <Flex p='0px 16px'>
            <Box display='flex' gap='8px' p='0px 8px' alignItems='center'>
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

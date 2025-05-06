import { Box, Text } from '@chakra-ui/react';

import { recipeI } from '~/interfaces/recipeI';

import { BookmarkIcon } from '../Icons/Bookmark';
import { LikeSmileIcon } from '../Icons/LikeSmile';

export function Interactions({ bookmarks, likes }: recipeI) {
    return (
        <Box display='flex' gap='5px' alignItems='flex-end'>
            {bookmarks ? (
                <Box display='flex' alignItems='center' gap='5px'>
                    <BookmarkIcon />
                    <Text color='#2db100' fontWeight={600} fontSize='12px'>
                        {bookmarks}
                    </Text>
                </Box>
            ) : null}
            {likes ? (
                <Box display='flex' alignItems='center' gap='5px'>
                    <LikeSmileIcon />
                    <Text color='#2db100' fontWeight={600} fontSize='12px'>
                        {likes}
                    </Text>
                </Box>
            ) : null}
        </Box>
    );
}

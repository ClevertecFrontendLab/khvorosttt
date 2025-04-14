import { Box, Text } from '@chakra-ui/react';

import { CardNewInfo } from '../CardNew/CardNew';
import { BookmarkIcon } from '../Icons/Bookmark';
import { LikeSmileIcon } from '../Icons/LikeSmile';

export function Interactions(data: CardNewInfo) {
    return (
        <Box display='flex' gap='5px'>
            {data.bookmark ? (
                <Box display='flex' alignItems='center' gap='5px'>
                    <BookmarkIcon />
                    <Text color='#2db100' fontWeight={600} fontSize='12px'>
                        {data.bookmark}
                    </Text>
                </Box>
            ) : null}
            {data.like ? (
                <Box display='flex' alignItems='center' gap='5px'>
                    <LikeSmileIcon />
                    <Text color='#2db100' fontWeight={600} fontSize='12px'>
                        {data.like}
                    </Text>
                </Box>
            ) : null}
        </Box>
    );
}

import { Flex, Text } from '@chakra-ui/react';

import { BookmarkIcon } from '~/components/Icons/Bookmark';
import { LikeSmileIcon } from '~/components/Icons/LikeSmile';
import { LikesBookmarksI } from '~/interfaces/bloggerI';
import { bookmarksText, likesText } from '~/pages/Bloggers/sections/utils';

import { CustomerChart } from '../CustomerChart/CustomerChart';

export interface ReactionStatisticProps {
    data: LikesBookmarksI[];
    color: string;
    type: 'bookmark' | 'like';
}

export function ReactionStatistic({ data, color, type }: ReactionStatisticProps) {
    return (
        <Flex flexDirection='column' w='100%' gap='10px'>
            <Flex gap='5px' alignItems='center'>
                {type === 'bookmark' ? <BookmarkIcon /> : <LikeSmileIcon />}
                <Text color='#2db100' fontFamily='text' fontWeight={600} fontSize='12px'>
                    {type === 'bookmark'
                        ? bookmarksText(data.length || 0)
                        : likesText(data.length || 0)}
                </Text>
            </Flex>
            {data.length && <CustomerChart data={data} color={color} />}
        </Flex>
    );
}

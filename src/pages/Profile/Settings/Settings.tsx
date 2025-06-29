import { Flex } from '@chakra-ui/react';

import { useGetCurrentUserInfoQuery, useGetUserStatisticQuery } from '~/api/authApi';
import { groupDataByWeek } from '~/pages/Bloggers/sections/utils';

import { ReactionStatistic } from './ReactionStatistic/ReactionStatistic';
import { Subscribers } from './Subscribers/Subscribers';
import { UpdateUserInfo } from './UpdateUserInfo/UpdateUserInfo';

export type UpdateInputs = {
    firstName: string;
    lastName: string;
};

export function Settings() {
    const { data: user } = useGetCurrentUserInfoQuery();
    const { data: statistic } = useGetUserStatisticQuery();
    console.log(statistic);
    const bookmarks = groupDataByWeek(statistic?.bookmarks || []);
    const likes = groupDataByWeek(statistic?.likes || []);

    return (
        <Flex
            w='100%'
            p={{ base: '90px 16px', md: '90px 20px', '2xl': '90px 0px' }}
            gap={{ base: '16px', lg: '32px' }}
            flexDirection='column'
        >
            <UpdateUserInfo user={user} />
            <Subscribers user={user} />
            <ReactionStatistic data={bookmarks} color='#2db100' type='bookmark' />
            <ReactionStatistic data={likes} color='#8c54ff' type='like' />
        </Flex>
    );
}

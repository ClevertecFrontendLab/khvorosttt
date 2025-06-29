import { Box, Flex } from '@chakra-ui/react';

import { useGetCurrentUserInfoQuery, useGetUserStatisticQuery } from '~/api/authApi';

import { UserInfo } from './components/UserInfo/UserInfo';

export function Profile() {
    const { data: user } = useGetCurrentUserInfoQuery();
    const { data: statistic } = useGetUserStatisticQuery();
    return (
        <Box w='100%' p={{ base: '90px 16px', md: '90px 20px', '2xl': '90px 0px' }}>
            <UserInfo user={user} statistic={statistic} />
            <Flex></Flex>
            <Flex></Flex>
            <Flex></Flex>
        </Box>
    );
}

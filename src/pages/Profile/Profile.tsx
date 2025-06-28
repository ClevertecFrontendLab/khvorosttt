import { Flex, Text } from '@chakra-ui/react';

import { useGetCurrentUserInfoQuery, useGetUserStatisticQuery } from '~/api/authApi';

import { UserInfo } from './components/UserInfo/UserInfo';
import { Recipe } from './sections/Recipe/Recipe';

export function Profile() {
    const { data: user } = useGetCurrentUserInfoQuery();
    const { data: statistic } = useGetUserStatisticQuery();
    console.log(user?.drafts.length);
    return (
        <Flex
            w='100%'
            p={{ base: '90px 16px', md: '90px 20px', '2xl': '90px 0px' }}
            gap={{ base: '16px', lg: '32px' }}
            flexDirection='column'
        >
            <UserInfo user={user} statistic={statistic} />
            <Recipe user={user} />
            <Flex data-test-id='blog-notes-box'>
                <Text>Заметки ()</Text>
            </Flex>
            <Flex data-test-id='user-profile-bookmarks'>
                <Text>Мои закладки ({statistic?.bookmarks.length})</Text>
            </Flex>
        </Flex>
    );
}

import { Flex } from '@chakra-ui/react';

import { useGetCurrentUserInfoQuery } from '~/api/authApi';

import { Subscribers } from './Subscribers/Subscribers';
import { UpdateUserInfo } from './UpdateUserInfo/UpdateUserInfo';

export type UpdateInputs = {
    firstName: string;
    lastName: string;
};

export function Settings() {
    const { data: user } = useGetCurrentUserInfoQuery();
    // const { data: statistic } = useGetUserStatisticQuery();

    return (
        <Flex
            w='100%'
            p={{ base: '90px 16px', md: '90px 20px', '2xl': '90px 0px' }}
            gap={{ base: '16px', lg: '32px' }}
            flexDirection='column'
        >
            <UpdateUserInfo user={user} />
            <Subscribers user={user} />
        </Flex>
    );
}

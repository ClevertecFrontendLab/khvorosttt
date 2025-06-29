import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useGetAllUserQuery } from '~/api/authApi';
import { PeopleIcon } from '~/components/Icons/People';
import { Loader } from '~/components/Loader/Loader';
import { allUserI, userI } from '~/interfaces/bloggerI';
import { sunscribersText } from '~/pages/Bloggers/sections/utils';

import { SmallUserCard } from '../SmallUserCard/SmallUserCard';

export interface SubscribersProps {
    user: userI | undefined;
}

export function Subscribers({ user }: SubscribersProps) {
    const { data: allUsers, isLoading: isUsersLoading } = useGetAllUserQuery();
    const [subscribers, setSubscribers] = useState<allUserI[]>([]);

    useEffect(() => {
        const temp = allUsers?.filter((u) => user?.subscribers?.some((subId) => subId === u.id));
        setSubscribers(temp || []);
    }, [user?.subscribers, allUsers]);

    if (!user) return null;
    return (
        <Flex flexDirection='column' gap='14px'>
            <Text fontFamily='text' fontWeight={700} fontSize='20px'>
                Статистика
            </Text>
            <Flex gap='5px' alignItems='center'>
                <PeopleIcon />
                <Text color='#2db100' fontFamily='text' fontWeight={600} fontSize='12px'>
                    {sunscribersText(subscribers.length)}
                </Text>
            </Flex>
            <Flex wrap='wrap' gap='12px' justifyContent='center'>
                {isUsersLoading && <Loader />}
                {subscribers?.map((subscriber, index) => (
                    <SmallUserCard key={index} user={subscriber} />
                ))}
            </Flex>
        </Flex>
    );
}

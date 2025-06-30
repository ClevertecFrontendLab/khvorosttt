import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { avatarStyle } from '~/components/Header/header.style';
import { IMAGE_BASED_PATH } from '~/data/consts';
import { allUserI } from '~/interfaces/bloggerI';

export interface SmallUserCardProps {
    user: allUserI;
}

export function SmallUserCard({ user }: SmallUserCardProps) {
    const navigate = useNavigate();
    return (
        <Flex
            align='center'
            gap={3}
            w={{ base: '328px', md: '359px', lg: '432px', '3xl': '445px' }}
            borderRadius='8px'
            border='1px solid rgba(0, 0, 0, 0.08)'
            p='16px 24px'
            onClick={() => navigate(`/blogs/${user.id}`)}
        >
            <Avatar
                name={`${user?.firstName} ${user?.lastName}`}
                sx={avatarStyle}
                src={user?.photo ? `${IMAGE_BASED_PATH}${user?.photo}` : ''}
            />
            <Box textAlign='left'>
                <Text color='black' fontSize='18px' fontWeight={500}>
                    {user?.firstName} {user?.lastName}
                </Text>
                <Text color='rgba(0, 0, 0, 0.64)' fontSize='14px' fontWeight={400}>
                    @{user?.login}
                </Text>
            </Box>
        </Flex>
    );
}

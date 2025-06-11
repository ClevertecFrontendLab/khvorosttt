import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetBloggersQuery } from '~/api/authApi';
import { BloggerCard } from '~/pages/Bloggers/sections/OthersBloggers/BloggerCard';
import { getUserIdFromToken } from '~/services/utils';

export function OtherBloggers() {
    const currentUserId = getUserIdFromToken();
    const { data: bloggers } = useGetBloggersQuery({ currentUserId: currentUserId!, limit: '' });
    const navigate = useNavigate();
    return (
        <Flex flexDirection='column' gap={{ base: '16px', lg: '24px' }}>
            <Flex justifyContent='space-between'>
                <Heading
                    as='h3'
                    fontWeight={{ base: 600, lg: 500 }}
                    fontSize={{ base: '24px', lg: '48px' }}
                    fontFamily='text'
                >
                    Другие блоги
                </Heading>
                <Button
                    variant='link'
                    rightIcon={<ArrowForwardIcon />}
                    fontSize='18px'
                    fontWeight={600}
                    color='black'
                    p='0px 16px'
                    w='149px'
                    h='40px'
                    borderRadius='6px'
                    alignSelf='center'
                    onClick={() => navigate('/blogs')}
                    data-test-id='blogger-user-other-blogs-button'
                >
                    Всe авторы
                </Button>
            </Flex>
            <Flex
                data-test-id='blogger-user-other-blogs-grid'
                gap='16px'
                h={{ base: '720px', sm: '216px', lg: '264px', '3xl': '224px' }}
                flexDirection={{ base: 'column', md: 'row' }}
            >
                {bloggers?.others?.slice(0, 3).map((blogger) => <BloggerCard blogger={blogger} />)}
            </Flex>
        </Flex>
    );
}

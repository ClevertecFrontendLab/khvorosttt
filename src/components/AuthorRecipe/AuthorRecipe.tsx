import { Avatar, Button, Flex, Text } from '@chakra-ui/react';

import { FollowIcon } from '../Icons/Follow';
import { PeopleIcon } from '../Icons/People';
import { AuthorRecipeStyle, ButtonStyle } from './authorRecipe.style';

interface AuthorRecipeProps {
    name: string;
    email: string;
    image: string;
    followers: number;
}

export function AuthorRecipe({ name, email, image, followers }: AuthorRecipeProps) {
    return (
        <Flex sx={AuthorRecipeStyle}>
            <Avatar name={name} src={image} w='96px' h='96px' />
            <Flex direction='column' gap='16px' w='100%'>
                <Flex
                    direction={{ base: 'column-reverse', ms: 'row' }}
                    justifyContent='space-between'
                >
                    <Flex direction='column' gap='4px'>
                        <Text fontSize='xl' fontWeight='bold'>
                            {name}
                        </Text>
                        <Text fontSize='sm' color='gray.500'>
                            {email}
                        </Text>
                    </Flex>
                    <Text alignSelf={{ base: 'flex-end', ms: 'flex-start' }}>Автор рецепта</Text>
                </Flex>
                <Flex justifyContent='space-between' w='100%' alignItems='center'>
                    <Button leftIcon={<FollowIcon />} variant='solid' sx={ButtonStyle}>
                        Подписаться
                    </Button>
                    <Flex alignItems='center' p='0px 4px' gap='4px'>
                        <PeopleIcon />
                        <Text>{followers}</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
}

import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Box, Flex, Hide, IconButton, Show, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetCurrentUserInfoQuery, useGetUserStatisticQuery } from '~/api/authApi.ts';
import { IMAGE_BASED_PATH } from '~/data/consts.ts';

import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import { BurgerMenuProps } from '../BurgerMenu/BurgerMenu.tsx';
import { NameIcon } from '../Icons/Name.tsx';
import { PotIcon } from '../Icons/Pot.tsx';
import { ProfileNotification } from '../ProfileNotification/ProfileNotification';
import { avatarStyle, headerStyle } from './header.style.ts';
import { bookmarksCount, likesCount } from './utils.tsx';

export function Header(props: BurgerMenuProps) {
    const { data: user } = useGetCurrentUserInfoQuery();
    const { data: statistic } = useGetUserStatisticQuery();
    const navigate = useNavigate();
    return (
        <Box
            as='header'
            sx={headerStyle}
            data-test-id='header'
            w='100%'
            bg={{ base: props.isOpen ? 'white' : 'headerBg', xl: 'headerBg' }}
        >
            <Flex align='center' justify='space-between' pb={0} pt={0}>
                <Flex
                    align='center'
                    gap={2}
                    w='256px'
                    data-test-id='header-logo'
                    onClick={() => navigate('/')}
                >
                    <PotIcon w='33px' h='32px' />
                    <Hide below='ms'>
                        <NameIcon w='96px' h='26px' />
                    </Hide>
                </Flex>
                <Hide below='xl'>
                    <Box flex='1' textAlign='center'>
                        <BreadCrumb isOpen={props.isOpen} toggleMenu={props.toggleMenu} />
                    </Box>
                </Hide>
                <Hide below='xl'>
                    <Flex
                        align='center'
                        gap={3}
                        data-test-id='header-profile-button'
                        onClick={() => navigate('/profile')}
                    >
                        <Avatar
                            name={`${user?.firstName} ${user?.lastName}`}
                            sx={avatarStyle}
                            src={user?.photoLink ? `${IMAGE_BASED_PATH}${user?.photoLink}` : ''}
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
                </Hide>
                <Flex align='center' gap={3} display={{ base: 'flex', xl: 'none' }}>
                    <Show below='xl'>
                        <ProfileNotification
                            bookmarks={bookmarksCount(statistic?.bookmarks)}
                            people={user ? user.subscribers.length : 0}
                            like={likesCount(statistic?.likes)}
                        />
                    </Show>
                    <IconButton
                        bg='transparent'
                        icon={!props.isOpen ? <HamburgerIcon /> : <CloseIcon />}
                        aria-label='Menu'
                        onClick={props.toggleMenu}
                        _hover={{ bg: 'transparent', color: 'inherit' }}
                        _active={{ bg: 'transparent', color: 'inherit' }}
                        _focus={{ boxShadow: 'none' }}
                        border='none'
                        data-test-id={!props.isOpen ? 'hamburger-icon' : 'close-icon'}
                    />
                </Flex>
            </Flex>
        </Box>
    );
}

import { HamburgerIcon } from '@chakra-ui/icons';
import { Avatar, Box, CloseButton, Flex, Hide, IconButton, Text } from '@chakra-ui/react';
import { useState } from 'react';

import avatar from '../../assets/images/kat_konst.jpg';
import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import { BurgerMenuProps } from '../BurgerMenu/BurgerMenu.tsx';
import { NameIcon } from '../Icons/Name.tsx';
import { PotIcon } from '../Icons/Pot.tsx';
import { ProfileNotification } from '../ProfileNotification/ProfileNotification';
import { avatarStyle, headerStyle } from './header.style.ts';

export function Header(props: BurgerMenuProps) {
    const [name] = useState('Екатерина Константинопольская');
    const [email] = useState('@bake_and_pie');
    return (
        <Box
            as='header'
            sx={headerStyle}
            data-test-id='header'
            w='100%'
            bg={{ base: props.isOpen ? 'white' : 'headerBg', xl: 'headerBg' }}
        >
            <Flex align='center' justify='space-between' pb={0} pt={0}>
                <Flex align='center' gap={2} w='256px'>
                    <PotIcon w='33px' h='32px' />
                    <Hide below='ms'>
                        <NameIcon w='96px' h='26px' />
                    </Hide>
                </Flex>
                <Hide below='xl'>
                    <Box flex='1' textAlign='center'>
                        <BreadCrumb />
                    </Box>
                </Hide>
                <Hide below='xl'>
                    <Flex align='center' gap={3}>
                        <Avatar sx={avatarStyle} name={name} src={avatar} />
                        <Box textAlign='left'>
                            <Text color='black' fontSize='18px' fontWeight={500}>
                                {name}
                            </Text>
                            <Text color='rgba(0, 0, 0, 0.64)' fontSize='14px' fontWeight={400}>
                                {email}
                            </Text>
                        </Box>
                    </Flex>
                </Hide>
                <Flex align='center' gap={3} display={{ base: 'flex', xl: 'none' }}>
                    <ProfileNotification bookmarks={0} people={0} like={0} />
                    <IconButton
                        bg='transparent'
                        icon={!props.isOpen ? <HamburgerIcon /> : <CloseButton />}
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

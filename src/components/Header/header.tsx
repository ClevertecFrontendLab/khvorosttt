//import React from "react";
import { HamburgerIcon } from '@chakra-ui/icons';
import {
    Avatar,
    Box,
    Flex,
    Grid,
    GridItem,
    Hide,
    IconButton,
    Link,
    Show,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';

import avatar from '../../assets/images/kat_konst.jpg';
import { NameIcon } from '../Icons/Name.tsx';
import { PotIcon } from '../Icons/Pot.tsx';
import { ProfileNotification } from '../ProfileNotification/ProfileNotification';

export function Header() {
    const [name] = useState('Екатерина Константинопольская');
    const [email] = useState('@bake_and_pie');
    return (
        <Box
            as='header'
            bg='headerBg'
            position='fixed'
            width='100%'
            h='64px'
            padding={{ '3xl': '16px 56px 16px 8px', base: '8px 20px' }}
            data-test-id='header'
            zIndex={3}
        >
            <Grid
                templateColumns={{ base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' }}
                alignItems='center'
                gap={{ lg: 6 }}
            >
                <GridItem colSpan={{ base: 1, ms: 2 }} alignItems='end'>
                    <Box display='flex' alignItems='end' gap='2'>
                        <PotIcon w='33px' h='32px' />
                        <Hide below='ms'>
                            <NameIcon w='96px' h='26px' />
                        </Hide>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 0, ms: 8, xl: 6 }}>
                    <Hide below='lg'>
                        <Flex alignItems='center' h='100%'>
                            <Link fontFamily='text' href='#'>
                                Главная
                            </Link>
                        </Flex>
                    </Hide>
                </GridItem>
                <Hide below='xl'>
                    <GridItem fontFamily='text' colSpan={{ base: 0, lg: 4 }} justifySelf='end'>
                        <Flex p='0px 24px' gap='10px'>
                            <Avatar
                                w='48px'
                                h='48px'
                                border='1px'
                                borderStyle='solid'
                                borderColor='black'
                                borderRadius={50}
                                name={name}
                                src={avatar}
                            />
                            <Box textAlign='left'>
                                <Text color='black' fontSize='18px'>
                                    {name}
                                </Text>
                                <Text color='rgba(0, 0, 0, 0.64)' fontSize='14px'>
                                    {email}
                                </Text>
                            </Box>
                        </Flex>
                    </GridItem>
                </Hide>
                <Show below='xl'>
                    <GridItem colSpan={{ base: 1, xl: 3 }} justifySelf='end'>
                        <ProfileNotification bookmarks={0} people={0} like={0} />
                    </GridItem>
                    <GridItem colSpan={1} justifySelf='center'>
                        <IconButton
                            bg='transparent'
                            icon={<HamburgerIcon />}
                            aria-label='HamburgerIcon'
                            onClick={() => {}}
                        />
                    </GridItem>
                </Show>
            </Grid>
        </Box>
    );
}

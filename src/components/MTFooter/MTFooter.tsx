import { Search2Icon } from '@chakra-ui/icons';
import { Avatar, Box, Grid, GridItem, Text } from '@chakra-ui/react';

import avatar from '../../assets/images/kat_konst.jpg';
import { HomeIcon } from '../Icons/Home';
import { NoteIcon } from '../Icons/Note';

export function Footer() {
    return (
        <Box
            as='footer'
            data-test-id='footer'
            bg='#ffffd3'
            width='100%'
            h='84px'
            position='fixed'
            bottom={0}
            zIndex={3}
        >
            <Grid templateColumns='repeat(4, 1fr)' p='10px 0px'>
                <GridItem>
                    <Box display='flex' flexDirection='column' alignItems='center' gap='8px'>
                        <Box
                            display='flex'
                            alignItems='center'
                            bg='black'
                            borderRadius={50}
                            p='0px 12px'
                            w='40px'
                            h='40px'
                        >
                            <HomeIcon />
                        </Box>
                        <Text fontSize='12px'>Главная</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <Search2Icon p='0px 12px' w='48px' h='48px' />
                        <Text fontSize='12px'>Поиск</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box display='flex' flexDirection='column' alignItems='center'>
                        <NoteIcon p='0px 12px' w='48px' h='48px' />
                        <Text fontSize='12px'>Записать</Text>
                    </Box>
                </GridItem>
                <GridItem>
                    <Box display='flex' flexDirection='column' alignItems='center' gap='8px'>
                        <Avatar
                            w='40px'
                            h='40px'
                            border='1px'
                            borderStyle='solid'
                            borderColor='black'
                            borderRadius={50}
                            src={avatar}
                        />
                        <Text fontSize='12px'>Мой профиль</Text>
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
}

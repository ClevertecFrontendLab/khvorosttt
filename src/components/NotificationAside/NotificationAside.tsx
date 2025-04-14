import { EditIcon } from '@chakra-ui/icons';
import { Flex, GridItem, Text } from '@chakra-ui/react';

import { ProfileNotification } from '../ProfileNotification/ProfileNotification';
import { NoteElementStyle, NoteStyle, NotificationAsideStyle } from './NotificationAside.style';

export function NotificationAside() {
    return (
        <GridItem colSpan={2} as='aside' sx={NotificationAsideStyle}>
            <ProfileNotification bookmarks={0} people={0} like={0} />
            <Flex sx={NoteElementStyle}>
                <Flex sx={NoteStyle}>
                    <EditIcon color='white' boxSize={6} />
                </Flex>
                <Text color='rgba(0, 0, 0, 0.64)' fontSize='12px' fontWeight={400}>
                    Записать рецепт
                </Text>
            </Flex>
        </GridItem>
    );
}

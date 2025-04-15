import { EditIcon } from '@chakra-ui/icons';
import { Flex, GridItem, Text } from '@chakra-ui/react';

import { ProfileNotification } from '../ProfileNotification/ProfileNotification';

export function NotificationAside() {
    return (
        <GridItem colSpan={2} p='90px 0px' as='aside' h='100%' alignItems='center'>
            <ProfileNotification bookmarks={0} people={0} like={0} />
            <Flex
                flexDirection='column'
                mt='auto'
                h='100%'
                alignItems='center'
                justifyContent='flex-end'
            >
                <Flex
                    bg='#000'
                    borderRadius={50}
                    w='48px'
                    h='48px'
                    p='0px 12px'
                    alignItems='center'
                >
                    <EditIcon color='white' boxSize={6} />
                </Flex>
                <Text color='rgba(0, 0, 0, 0.64)' fontSize='12px'>
                    Записать рецепт
                </Text>
            </Flex>
        </GridItem>
    );
}

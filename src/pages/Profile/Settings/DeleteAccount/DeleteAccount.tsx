import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';

import { DeleteModal } from './DeleteModal/DeleteModal';

export function DeleteAccount() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex flexDirection='column' gap='16px'>
            <Text fontFamily='text' fontSize='20px' fontWeight={700}>
                Удаление аккаунта
            </Text>
            <Button
                rightIcon={<ArrowForwardIcon />}
                fontFamily='text'
                fontSize='16px'
                fontWeight={500}
                w='fit-content'
                variant='ghost'
                pl='0px'
                onClick={onOpen}
            >
                Удалить мой аккаунт
            </Button>
            <DeleteModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
}

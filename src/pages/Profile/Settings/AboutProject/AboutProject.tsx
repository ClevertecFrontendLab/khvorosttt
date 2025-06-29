import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Flex, Link, Text } from '@chakra-ui/react';

export function AboutProject() {
    return (
        <Flex flexDirection='column' gap='16px'>
            <Text fontFamily='text' fontSize='20px' fontWeight={700}>
                О проекте
            </Text>
            <Flex fontFamily='text' fontSize='16px' fontWeight={500}>
                <Text>Связаться с &nbsp;</Text>{' '}
                <Link href='https://clevertec.ru/' isExternal textDecoration='underline'>
                    разработчиками <ArrowForwardIcon />
                </Link>
            </Flex>
        </Flex>
    );
}

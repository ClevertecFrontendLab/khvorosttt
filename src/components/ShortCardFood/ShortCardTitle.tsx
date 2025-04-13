import { Box, Button, Card, CardHeader, Image, Text } from '@chakra-ui/react';

import { markFood } from '~/data/consts';

import { CardNewInfo } from '../CardNew/CardNew';

export function ShortCardTitle(data: CardNewInfo) {
    return (
        <Card>
            <CardHeader p='16px 12px' w='100%' gap='10px'>
                <Box display='flex' alignContent='center'>
                    <Image src={markFood(data.marker)} w='24px' h='24px' />
                    <Text fontWeight={500} fontSize='20px' overflow='hidden' isTruncated>
                        {data.title}
                    </Text>
                    <Button
                        ml='auto'
                        color=' #2db100'
                        borderColor=' #2db100'
                        fontStyle='text'
                        variant='outline'
                        minW={{ base: '70px', lg: '85px' }}
                    >
                        Готовить
                    </Button>
                </Box>
            </CardHeader>
        </Card>
    );
}

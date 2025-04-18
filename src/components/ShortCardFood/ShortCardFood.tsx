import { Box, Card, CardBody, CardHeader, Flex, Heading, Image, Text } from '@chakra-ui/react';

import { markerFood, markFood } from '~/data/consts';

import { CardNewInfo } from '../CardNew/CardNew';
import { Interactions } from '../Interactions/Interactions';

export function ShortCardFood(data: CardNewInfo) {
    return (
        <Card overflow='hidden' h='100%'>
            <CardHeader padding='16px 16px 8px 16px' w='100%'>
                <Heading fontWeight={500} fontSize='20px' overflow='hidden' isTruncated>
                    {data.title}
                </Heading>
            </CardHeader>
            <CardBody
                display='flex'
                flexDirection='column'
                padding='8px 16px 16px 16px'
                w='100%'
                gap='20px'
            >
                <Text fontSize='14px' isTruncated noOfLines={3} whiteSpace='wrap'>
                    {data.description}
                </Text>
                <Flex justifyContent='space-between' w='100%' mt='auto'>
                    <Box
                        display='flex'
                        padding='2px 4px'
                        bg='#d7ff94'
                        alignItems='center'
                        justifyContent='space-between'
                        borderRadius='4px'
                        gap='5px'
                    >
                        <Image src={markFood(data.marker)} w='16px' h='16px' />
                        <Text fontSize='14px' fontWeight={400}>
                            {markerFood[data.marker]}
                        </Text>
                    </Box>
                    <Interactions {...data} />
                </Flex>
            </CardBody>
        </Card>
    );
}

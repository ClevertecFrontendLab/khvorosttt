import { Box, Card, CardBody, Flex, Heading, Hide, Image, Stack, Text } from '@chakra-ui/react';

import { markerFood, markFood } from '~/data/consts';

import { Interactions } from '../Interactions/Interactions';

export type CardNewInfo = {
    title: string;
    src: string;
    description: string;
    marker: number;
    bookmark: number;
    like: number;
};

export type CardNewType = {
    data: CardNewInfo;
};

export function CardNew({ data }: CardNewType) {
    return (
        <Card maxW='sm' borderRadius='8px' padding={0} overflow='hidden' fontFamily='text' h='100%'>
            <CardBody w='100%' padding={0}>
                <Image src={data.src} alt={data.title} w='100%' />
                <Stack
                    maxH='184px'
                    gap='15px'
                    padding={{ base: '8px 8px 4px 8px', lg: '16px 24px 20px 24px' }}
                    justifyContent='space-between'
                >
                    <Stack mt='6' spacing='3' maxH='100px' m={0}>
                        <Heading
                            size='md'
                            isTruncated
                            fontSize={{ base: '16px', lg: '18px' }}
                            whiteSpace={{ base: 'wrap', lg: 'nowrap' }}
                            noOfLines={2}
                        >
                            {data.title}
                        </Heading>
                        <Hide below='lg'>
                            <Text isTruncated noOfLines={3} whiteSpace='wrap'>
                                {data.description}
                            </Text>
                        </Hide>
                    </Stack>
                    <Flex justifyContent='space-between' w='100%'>
                        <Hide below='xl'>
                            <Box
                                display='flex'
                                padding='2px 8px'
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
                        </Hide>
                        <Interactions {...data} />
                    </Flex>
                </Stack>
            </CardBody>
        </Card>
    );
}

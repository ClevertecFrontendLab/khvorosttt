import { Box, Card, CardBody, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';

import { markerFood, markFood } from '~/data/consts';

import { BookmarkIcon } from '../Icons/Bookmark';
import { LikeSmileIcon } from '../Icons/LikeSmile';

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
        <Card maxW='sm' borderRadius='8px' padding={0} overflow='hidden' fontFamily='text'>
            <CardBody w='100%' padding={0}>
                <Image src={data.src} alt={data.title} w='100%' />
                <Box
                    display='flex'
                    flexDirection='column'
                    h='184px'
                    gap='15px'
                    padding='16px 24px 20px 24px'
                >
                    <Stack mt='6' spacing='3' h='100px' m={0}>
                        <Heading size='md' isTruncated>
                            {data.title}
                        </Heading>
                        <Text isTruncated noOfLines={3} whiteSpace='wrap'>
                            {data.description}
                        </Text>
                    </Stack>
                    <Flex justifyContent='space-between' w='100%'>
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
                        <Box>
                            {data.bookmark ? (
                                <Box display='flex' alignItems='center' gap='5px'>
                                    <BookmarkIcon />
                                    <Text color='#2db100' fontWeight={600}>
                                        {data.bookmark}
                                    </Text>
                                </Box>
                            ) : (
                                <Box display='flex' alignItems='center' gap='5px'>
                                    <LikeSmileIcon />
                                    <Text color='#2db100' fontWeight={600}>
                                        {data.like}
                                    </Text>
                                </Box>
                            )}
                        </Box>
                    </Flex>
                </Box>
            </CardBody>
        </Card>
    );
}

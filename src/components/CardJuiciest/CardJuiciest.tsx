import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    Flex,
    Heading,
    Hide,
    Image,
    Stack,
    Text,
} from '@chakra-ui/react';

import { markerFood, markFood } from '~/data/consts';

import { CardNewType } from '../CardNew/CardNew';
import { BookmarkIcon } from '../Icons/Bookmark';
import { Interactions } from '../Interactions/Interactions';

export function CardJuiciest({ data }: CardNewType) {
    return (
        <Card
            direction={{ sm: 'row' }}
            overflow='hidden'
            variant='outline'
            maxH='244px'
            w='100%'
            position='relative'
        >
            <Image
                objectFit='cover'
                w='100%'
                maxW={{ base: '158px', '2xl': '346px' }}
                src={data.src}
                alt={data.title}
            />
            <Stack p={{ base: '8px 8px 4px 8px', lg: '20px 24px' }} w='100%' overflow='hidden'>
                <Flex
                    justifyContent={{ lg: 'space-between' }}
                    gap={{ base: '30px' }}
                    w='100%'
                    position={{ base: 'absolute', lg: 'relative' }}
                    top={{ base: '8px', lg: 'initial' }}
                    left={{ base: '8px', lg: 'initial' }}
                    paddingRight='20px'
                    zIndex={1}
                >
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
                    <Interactions {...data} />
                </Flex>
                <CardBody padding={0} mt='20px' w='100%'>
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
                        <Text whiteSpace='wrap' noOfLines={3} fontSize='14px' fontFamily='text'>
                            {data.description}
                        </Text>
                    </Hide>
                </CardBody>

                <CardFooter display='flex' gap='5px' p={0} justifyContent='flex-end'>
                    <Button
                        bg='transparent'
                        color='black'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        p='0px 12px'
                        gap='5px'
                    >
                        <BookmarkIcon />
                        <Hide below='lg'>
                            <Text>Сохранить</Text>
                        </Hide>
                    </Button>
                    <Button bg='black' color='white' p='0px 12px'>
                        <Text>Готовить</Text>
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

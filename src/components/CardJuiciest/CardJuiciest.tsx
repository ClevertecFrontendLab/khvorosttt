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
            transition='all 0.2s ease'
            _hover={{
                boxShadow: 'lg',
            }}
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
                        bg=' #ffffd3'
                        alignItems='center'
                        justifyContent='space-between'
                        borderRadius='4px'
                        gap='5px'
                    >
                        <Image src={markFood(data.marker)} w='16px' h='16px' />
                        <Text fontSize='14px' fontWeight={400} fontStyle='text'>
                            {markerFood[data.marker]}
                        </Text>
                    </Box>
                    <Interactions {...data} />
                </Flex>
                <CardBody
                    padding={0}
                    mt='25px'
                    w='100%'
                    gap='10px'
                    display='flex'
                    flexDirection='column'
                >
                    <Heading
                        size='md'
                        isTruncated
                        fontSize={{ base: '16px', '2xl': '20px' }}
                        fontWeight={500}
                        whiteSpace={{ base: 'wrap', lg: 'nowrap' }}
                        noOfLines={2}
                        fontFamily='text'
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
                        p='0px 6px'
                        gap='5px'
                        w={{ base: '24px', md: 'auto' }}
                        h={{ base: '24px', md: '32px' }}
                    >
                        <BookmarkIcon />
                        <Hide below='lg'>
                            <Text>Сохранить</Text>
                        </Hide>
                    </Button>
                    <Button bg='black' color='white' p='0px 8px' h={{ base: '24px', md: '32px' }}>
                        <Text>Готовить</Text>
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

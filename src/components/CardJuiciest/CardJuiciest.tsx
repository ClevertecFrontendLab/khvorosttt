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
import {
    CardBodyHeadingStyle,
    CardBodyStyle,
    CardImageStyle,
    CardStyle,
    MarkerInteractionsStyle,
    MarkerStyle,
    SaveButtonStyle,
} from './CardJuisiest.style';

export function CardJuiciest({ data }: CardNewType) {
    return (
        <Card sx={CardStyle} direction={{ sm: 'row' }}>
            <Image sx={CardImageStyle} src={data.src} alt={data.title} />
            <Stack p={{ base: '8px 8px 4px 8px', lg: '20px 24px' }} w='100%' overflow='hidden'>
                <Flex sx={MarkerInteractionsStyle}>
                    <Box sx={MarkerStyle}>
                        <Image src={markFood(data.marker)} w='16px' h='16px' />
                        <Text fontSize='14px' fontWeight={400} fontFamily='text'>
                            {markerFood[data.marker]}
                        </Text>
                    </Box>
                    <Interactions {...data} />
                </Flex>
                <CardBody sx={CardBodyStyle}>
                    <Heading size='md' isTruncated sx={CardBodyHeadingStyle}>
                        {data.title}
                    </Heading>
                    <Hide below='lg'>
                        <Text whiteSpace='wrap' noOfLines={3} fontSize='14px' fontFamily='text'>
                            {data.description}
                        </Text>
                    </Hide>
                </CardBody>
                <CardFooter display='flex' gap='5px' p={0} justifyContent='flex-end'>
                    <Button sx={SaveButtonStyle}>
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

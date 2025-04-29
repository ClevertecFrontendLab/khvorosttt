import {
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
import { useNavigate } from 'react-router';

import { recipeI } from '~/data/interface/data';

import { CategoryMarker } from '../CategoryMarker/CategoryMarker';
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

export function CardJuiciest({ data, index }: { data: recipeI; index: number }) {
    const navigate = useNavigate();
    return (
        <Card sx={CardStyle} direction={{ sm: 'row' }}>
            <Image sx={CardImageStyle} src={data.image} alt={data.title} />
            <Stack p={{ base: '8px 8px 4px 8px', lg: '20px 24px' }} w='100%' overflow='hidden'>
                <Flex sx={MarkerInteractionsStyle} alignItems='flex-start'>
                    <Flex wrap='wrap' gap='3px' direction={{ base: 'column', xl: 'row' }}>
                        <CategoryMarker style={MarkerStyle} data={data} />
                    </Flex>
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
                    <Button
                        bg='black'
                        color='white'
                        p='0px 8px'
                        h={{ base: '24px', md: '32px' }}
                        data-test-id={`card-link-${index}`}
                        onClick={() => {
                            navigate(`/${data.category[0]}/${data.subcategory[0]}/${data.id}`);
                        }}
                    >
                        <Text>Готовить</Text>
                    </Button>
                </CardFooter>
            </Stack>
        </Card>
    );
}

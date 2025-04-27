import { Box, Card, CardBody, Flex, Heading, Hide, Image, Text } from '@chakra-ui/react';

import { recipeI } from '~/data/interface/data';

import { CategoryMarker } from '../CategoryMarker/CategoryMarker';
import { Interactions } from '../Interactions/Interactions';
import {
    CardBodyStyle,
    CardHeadStyle,
    CardStyle,
    CardTagMobileElementsStyle,
    CardTagMobileStyle,
    MarkerStyle,
} from './CardNew.style';

export type CardNewInfo = {
    title: string;
    src: string;
    description: string;
    marker: string;
    bookmark: number;
    like: number;
};

export type CardNewType = {
    data: CardNewInfo;
};

export function CardNew(data: recipeI) {
    return (
        <Card
            sx={CardStyle}
            position='relative'
            transition='all 0.2s ease'
            _hover={{
                boxShadow: 'lg',
            }}
        >
            <Flex sx={CardTagMobileStyle}>
                <Box sx={CardTagMobileElementsStyle}>
                    <CategoryMarker style={MarkerStyle} data={data} />
                </Box>
            </Flex>
            <CardBody w='100%' padding={0} display='flex' flexDirection='column'>
                <Image
                    src={data.image}
                    alt={data.title}
                    w='100%'
                    minH='158px'
                    maxH='230px'
                    objectFit='cover'
                />
                <Flex sx={CardBodyStyle} direction='column'>
                    <Box mb='10px'>
                        <Heading sx={CardHeadStyle}>{data.title}</Heading>
                        <Hide below='lg'>
                            <Text noOfLines={3} mt='4px' fontSize='14px'>
                                {data.description}
                            </Text>
                        </Hide>
                    </Box>
                    <Flex justifyContent='space-between' mt='auto'>
                        <Hide below='xl'>
                            <Box sx={CardTagMobileElementsStyle}>
                                <CategoryMarker style={MarkerStyle} data={data} />
                            </Box>
                        </Hide>
                        <Interactions {...data} />
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
}

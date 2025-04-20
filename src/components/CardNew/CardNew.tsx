import { Box, Card, CardBody, Flex, Heading, Hide, Image, Text } from '@chakra-ui/react';

import { markFood } from '~/data/consts';

import { Interactions } from '../Interactions/Interactions';
import {
    CardBodyStyle,
    CardHeadStyle,
    CardStyle,
    CardTagMobileElementsStyle,
    CardTagMobileStyle,
    CardTagStyle,
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

export function CardNew({ data }: CardNewType) {
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
                    <Image src={markFood(data.marker)} w='16px' h='16px' />
                    <Text fontSize='14px' fontWeight={400}>
                        {data.marker}
                    </Text>
                </Box>
            </Flex>
            <CardBody w='100%' padding={0} display='flex' flexDirection='column'>
                <Image src={data.src} alt={data.title} w='100%' />
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
                        <Hide below='2xl'>
                            <Box sx={CardTagStyle}>
                                <Image src={markFood(data.marker)} w='16px' h='16px' />
                                <Text fontSize='14px' fontWeight={400}>
                                    {data.marker}
                                </Text>
                            </Box>
                        </Hide>
                        <Interactions {...data} />
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
}

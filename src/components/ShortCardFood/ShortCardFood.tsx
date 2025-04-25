import { Card, CardBody, CardHeader, Flex, Heading, Text } from '@chakra-ui/react';

import { recipeI } from '~/data/interface/data';

import { MarkerStyle } from '../CardNew/CardNew.style';
import { CategoryMarker } from '../CategoryMarker/CategoryMarker';
import { Interactions } from '../Interactions/Interactions';

export function ShortCardFood(data: recipeI) {
    return (
        <Card
            overflow='hidden'
            h='100%'
            p={{ base: '12px', '3xl': '24px 24px 20px 24px' }}
            display='flex'
            flexDirection='column'
            gap='15px'
            transition='all 0.2s ease'
            _hover={{
                boxShadow: 'lg',
            }}
        >
            <CardHeader w='100%' p={0}>
                <Heading
                    fontWeight={500}
                    fontSize={{ lg: '20px', base: '16px' }}
                    overflow='hidden'
                    isTruncated
                >
                    {data.title}
                </Heading>
            </CardHeader>
            <CardBody display='flex' flexDirection='column' p={0} w='100%' gap='20px'>
                <Text fontSize='14px' isTruncated noOfLines={3} whiteSpace='wrap'>
                    {data.description}
                </Text>
                <Flex justifyContent='space-between' w='100%' mt='auto'>
                    <Flex flexDirection='column' gap='5px'>
                        <CategoryMarker style={MarkerStyle} data={data} />
                    </Flex>
                    <Interactions {...data} />
                </Flex>
            </CardBody>
        </Card>
    );
}

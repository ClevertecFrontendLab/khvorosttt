import { Box, Flex, Grid, GridItem, Text } from '@chakra-ui/react';

import { CardNewType } from '~/components/CardNew/CardNew';
import { ShortCardFood } from '~/components/ShortCardFood/ShortCardFood';
import { ShortCardTitle } from '~/components/ShortCardFood/ShortCardTitle';

export type CategoryInfoType = {
    name: string;
    description: string;
    data: CardNewType[];
};

export function CategoryInfo({ name, description, data }: CategoryInfoType) {
    return (
        <Box display='flex' flexDirection='column' gap='24px'>
            <Flex flexDirection={{ base: 'column', md: 'row' }} alignItems='center'>
                <Text as='h3' fontWeight={500} fontSize='36px' mr='auto'>
                    {name}
                </Text>
                <Text
                    ml='auto'
                    fontSize='16px'
                    color='rgba(0, 0, 0, 0.64)'
                    maxW={{ xl: '578px', '2xl': '668px' }}
                >
                    {description}
                </Text>
            </Flex>
            <Grid
                templateColumns={{ base: 'repeat(4, 1fr)', md: 'repeat(12, 1fr)' }}
                w='100%'
                gap='24px'
            >
                <GridItem colSpan={{ base: 4 }}>
                    <ShortCardFood {...data[0].data} />
                </GridItem>
                <GridItem colSpan={{ base: 4 }}>
                    <ShortCardFood {...data[1].data} />
                </GridItem>
                <GridItem colSpan={{ base: 4 }}>
                    <Flex flexDirection='column' gap='12px'>
                        <ShortCardTitle {...data[2].data} />
                        <ShortCardTitle {...data[3].data} />
                        <ShortCardTitle {...data[4].data} />
                    </Flex>
                </GridItem>
            </Grid>
        </Box>
    );
}

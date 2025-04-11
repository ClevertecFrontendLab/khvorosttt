import { Box, Grid, GridItem, Text } from '@chakra-ui/react';

import { CardJuiciest } from '~/components/CardJuiciest/CardJuiciest';
import { CardNew } from '~/components/CardNew/CardNew';
import juiciest from '~/data/juiciest.json';
import newData from '~/data/new.json';

export function Home() {
    return (
        <Box w='100%'>
            <Grid>
                <Box>
                    <Text as='h2' fontWeight={700} fontSize='48px'>
                        Приятного аппетита!
                    </Text>
                </Box>
                <Box>
                    <Box>
                        <Text as='h3' fontWeight={500} fontSize='48px'>
                            Новые рецепты
                        </Text>
                        <Grid templateColumns='repeat(12, 1fr)' w='100%' gap='24px'>
                            {newData.map((item, index) => (
                                <GridItem key={index} colSpan={3}>
                                    <CardNew data={item.data} />
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                    <Box>
                        <Text as='h3' fontWeight={500} fontSize='48px'>
                            Самое сочное
                        </Text>
                        <Grid
                            templateColumns={{ base: 'repeat(4, 1fr)', ms: 'repeat(12, 1fr)' }}
                            w='100%'
                            gap='24px'
                        >
                            {juiciest.map((item, index) => (
                                <GridItem key={index} colSpan={{ base: 4, sm: 6, lg: 12, xl: 6 }}>
                                    <CardJuiciest data={item.data} />
                                </GridItem>
                            ))}
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Box>
    );
}

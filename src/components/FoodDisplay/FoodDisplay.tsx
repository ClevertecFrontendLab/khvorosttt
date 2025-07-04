import { Box, Button, Flex, Grid, GridItem } from '@chakra-ui/react';

import { recipeI } from '~/interfaces/recipeI';

import { CardJuiciest } from '../CardJuiciest/CardJuiciest';
import { ButtonMoreStyle, FoodDisplayStyle } from './FoodDisplay.style';

interface FoodDisplayProps {
    data: recipeI[];
    loadMore: () => void;
    hasMore: boolean;
    isLoading: boolean;
    refetch?: () => void;
}

export function FoodDisplay({ data, loadMore, hasMore, isLoading, refetch }: FoodDisplayProps) {
    return (
        <Flex flexDirection='column' gap='16px' padding={{ base: '16px', ms: '20px', xl: '24px' }}>
            <Grid sx={FoodDisplayStyle}>
                {data.map((recipe, index) => (
                    <GridItem key={index} colSpan={{ base: 4, sm: 6, xl: 12, '3xl': 6 }}>
                        <Box data-test-id={`food-card-${index}`}>
                            <CardJuiciest index={index} data={recipe} refetch={refetch} />
                        </Box>
                    </GridItem>
                ))}
            </Grid>
            {hasMore ? (
                <Button sx={ButtonMoreStyle} onClick={loadMore} data-test-id='load-more-button'>
                    {isLoading ? 'Загрузить ещё' : 'Загрузка'}
                </Button>
            ) : null}
        </Flex>
    );
}

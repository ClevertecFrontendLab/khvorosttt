import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';

import { recipeI } from '~/data/interface/data';

import { CardJuiciest } from '../CardJuiciest/CardJuiciest';
import { ButtonMoreStyle, FoodDisplayStyle } from './FoodDisplay.style';

interface FoodDisplayProps {
    data: recipeI[];
}

export function FoodDisplay({ data }: FoodDisplayProps) {
    return (
        <Flex flexDirection='column' gap='16px' padding={{ base: '16px', ms: '20px', xl: '24px' }}>
            <Grid sx={FoodDisplayStyle}>
                {data.map((recipe, index) => (
                    <GridItem key={index} colSpan={{ base: 4, sm: 6, xl: 12, '3xl': 6 }}>
                        <CardJuiciest {...recipe} />
                    </GridItem>
                ))}
            </Grid>
            <Button sx={ButtonMoreStyle} onClick={() => {}}>
                Загрузить ещё
            </Button>
        </Flex>
    );
}

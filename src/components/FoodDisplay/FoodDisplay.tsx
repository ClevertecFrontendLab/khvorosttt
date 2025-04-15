import { Button, Flex, Grid, GridItem } from '@chakra-ui/react';

import { CardJuiciest } from '../CardJuiciest/CardJuiciest';
import { CardNewType } from '../CardNew/CardNew';
import { ButtonMoreStyle, FoodDisplayStyle } from './FoodDisplay.style';

interface FoodDisplayProps {
    data: CardNewType[];
}

export function FoodDisplay({ data }: FoodDisplayProps) {
    return (
        <Flex flexDirection='column' gap='16px'>
            <Grid sx={FoodDisplayStyle}>
                {data.map((item, index) => (
                    <GridItem key={index} colSpan={{ base: 4, sm: 6, xl: 12, '3xl': 6 }}>
                        <CardJuiciest data={item.data} />
                    </GridItem>
                ))}
            </Grid>
            <Button sx={ButtonMoreStyle} onClick={() => {}}>
                Загрузить ещё
            </Button>
        </Flex>
    );
}

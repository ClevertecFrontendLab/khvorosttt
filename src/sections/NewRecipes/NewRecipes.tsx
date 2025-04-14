import { Box, Text } from '@chakra-ui/react';

import { CardNew, CardNewType } from '~/components/CardNew/CardNew';

interface NewRecipes {
    data: CardNewType[];
}

export function NewRecipes({ data }: NewRecipes) {
    return (
        <Box>
            <Text as='h3' fontWeight={500} fontSize='48px'>
                Новые рецепты
            </Text>
            <Box display='flex' gap='24px' overflow='hidden' w='100%'>
                {data.map((item, index) => (
                    <Box
                        key={index}
                        flex='0 0 auto'
                        w={{ base: '50%', ms: '30%', lg: '22%', xl: '24%' }}
                    >
                        <CardNew data={item.data} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

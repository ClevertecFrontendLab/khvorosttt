import { Box, Flex, Text } from '@chakra-ui/react';

import { CardNew, CardNewType } from '~/components/CardNew/CardNew';

interface NewRecipes {
    data: CardNewType[];
}

export function NewRecipes({ data }: NewRecipes) {
    return (
        <Flex flexDirection='column' gap='24px'>
            <Text
                as='h3'
                fontWeight={500}
                fontSize={{ '3xl': '48px', '2xl': '36px', base: '24px' }}
            >
                Новые рецепты
            </Text>
            <Box
                display='flex'
                gap='24px'
                overflow='hidden'
                w='100%'
                justifyContent='space-between'
                p='5px 0px'
            >
                {data.map((item, index) => (
                    <Box
                        key={index}
                        flex='0 0 auto'
                        w={{ base: '46%', ms: '30%', lg: '22%', xl: '30%', '3xl': '23%' }}
                    >
                        <CardNew data={item.data} />
                    </Box>
                ))}
            </Box>
        </Flex>
    );
}

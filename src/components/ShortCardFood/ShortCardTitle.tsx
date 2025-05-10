import { Box, Button, Card, CardHeader, Image, Text } from '@chakra-ui/react';

import { IMAGE_BASED_PATH } from '~/data/consts';
import { categoryI } from '~/interfaces/categoryI';
import { recipeI } from '~/interfaces/recipeI';

export interface ShortCardTitleProps {
    data: recipeI;
    category: categoryI;
}

export function ShortCardTitle({ data, category }: ShortCardTitleProps) {
    if (!data) {
        return null;
    }
    return (
        <Card
            transition='all 0.2s ease'
            _hover={{
                boxShadow: 'lg',
            }}
        >
            <CardHeader p='16px 12px' w='100%' gap='10px'>
                <Box display='flex' alignContent='center'>
                    <Image src={`${IMAGE_BASED_PATH}${category.icon}`} w='24px' h='24px' />
                    <Text
                        fontWeight={500}
                        fontSize={{ '3xl': '20px', '2xl': '18px', base: '16px' }}
                        overflow='hidden'
                        isTruncated
                    >
                        {data.title}
                    </Text>
                    <Button
                        ml='auto'
                        color=' #2db100'
                        borderColor=' #2db100'
                        fontFamily='text'
                        variant='outline'
                        minW={{ base: '70px', lg: '85px' }}
                        h='32px'
                        p='0px 6px'
                        fontSize={{ base: '12px', '3xl': '14px' }}
                    >
                        Готовить
                    </Button>
                </Box>
            </CardHeader>
        </Card>
    );
}

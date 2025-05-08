import { Flex, Text } from '@chakra-ui/react';

import { nutritionValueI } from '~/interfaces/recipeI';

import {
    BoxStyle,
    sectionMeasureUnitStyle,
    sectionNameStyle,
    sectionValueStyle,
} from './calories.style';

export function Calories(data: nutritionValueI) {
    return (
        <Flex direction='column' w='100%' gap='24px'>
            <Text fontFamily='text' fontWeight={400} fontSize='14px' color='rgba(0, 0, 0, 0.8)'>
                * Калорийность на одну порцию
            </Text>
            <Flex
                direction={{ base: 'column', ms: 'row' }}
                gap={{ base: '12px', '3xl': '24px' }}
                justifyContent='center'
            >
                <Flex sx={BoxStyle} direction={{ base: 'row', ms: 'column' }}>
                    <Text sx={sectionNameStyle}>калорийность</Text>
                    <Text sx={sectionValueStyle}>{data.calories}</Text>
                    <Text sx={sectionMeasureUnitStyle}>ККАЛ</Text>
                </Flex>
                <Flex sx={BoxStyle} direction={{ base: 'row', ms: 'column' }}>
                    <Text sx={sectionNameStyle}>белки</Text>
                    <Text sx={sectionValueStyle}>{data.protein}</Text>
                    <Text sx={sectionMeasureUnitStyle}>ГРАММ</Text>
                </Flex>
                <Flex sx={BoxStyle} direction={{ base: 'row', ms: 'column' }}>
                    <Text sx={sectionNameStyle}>жиры</Text>
                    <Text sx={sectionValueStyle}>{data.fats}</Text>
                    <Text sx={sectionMeasureUnitStyle}>ГРАММ</Text>
                </Flex>
                <Flex sx={BoxStyle} direction={{ base: 'row', ms: 'column' }}>
                    <Text sx={sectionNameStyle}>углеводы</Text>
                    <Text sx={sectionValueStyle}>{data.carbohydrates}</Text>
                    <Text sx={sectionMeasureUnitStyle}>ГРАММ</Text>
                </Flex>
            </Flex>
        </Flex>
    );
}

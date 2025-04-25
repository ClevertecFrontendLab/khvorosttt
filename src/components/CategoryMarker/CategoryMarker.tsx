import { Box, Image, SystemStyleObject, Text } from '@chakra-ui/react';

import { markerFood, markFood } from '~/data/consts';
import { recipeI } from '~/data/interface/data';

interface markerCategoryProps {
    style: SystemStyleObject;
    data: recipeI;
}

export function CategoryMarker({ style, data }: markerCategoryProps) {
    return (
        <>
            {data.category.map((category, index) => (
                <Box sx={style} key={index} w='fit-content'>
                    <Image src={markFood(category)} w='16px' h='16px' />
                    <Text
                        fontSize='14px'
                        fontWeight={400}
                        fontFamily='text'
                        noOfLines={1}
                        isTruncated
                    >
                        {markerFood[category]}
                    </Text>
                </Box>
            ))}
        </>
    );
}

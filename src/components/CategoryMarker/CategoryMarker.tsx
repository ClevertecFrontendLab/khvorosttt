import { Box, Image, SystemStyleObject, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { IMAGE_BASED_PATH } from '~/data/consts';
import { recipeI } from '~/interfaces/recipeI';
import { selectedCategories } from '~/services/features/selectors';

interface markerCategoryProps {
    style: SystemStyleObject;
    data: recipeI;
}

export function CategoryMarker({ style, data }: markerCategoryProps) {
    const categoriesSavedData = useSelector(selectedCategories);

    const findCategories = (categoriesIds: string) => {
        const subcategory = categoriesSavedData.subcategories.find(
            (item) => item._id === categoriesIds,
        );
        const category = categoriesSavedData.categories.find(
            (item) => item._id === subcategory?.rootCategoryId,
        );
        return category;
    };
    return (
        <>
            {data.categoriesIds.map((categoryId, index) => {
                const category = findCategories(categoryId);
                return (
                    <Box sx={style} key={index} w='fit-content'>
                        <Image src={`${IMAGE_BASED_PATH}${category?.icon}`} w='16px' h='16px' />
                        <Text fontSize='14px' fontWeight={400} fontFamily='text' noOfLines={1}>
                            {category?.title}
                        </Text>
                    </Box>
                );
            })}
        </>
    );
}

import { Box, Image, SystemStyleObject, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { IMAGE_BASED_PATH } from '~/data/consts';
import { categoryI } from '~/interfaces/categoryI';
import { recipeI } from '~/interfaces/recipeI';
import { selectedCategories } from '~/services/features/selectors';

interface markerCategoryProps {
    style: SystemStyleObject;
    data: recipeI;
}

export function CategoryMarker({ style, data }: markerCategoryProps) {
    const categoriesSavedData = useSelector(selectedCategories);
    const findCategories = (categoriesIds: string[]) => {
        const categories: categoryI[] = [];
        categoriesIds.forEach((id) => {
            const subcategory = categoriesSavedData.subcategories.find((item) => item._id === id);

            if (subcategory) {
                const category = categoriesSavedData.categories.find(
                    (item) => item._id === subcategory.rootCategoryId,
                );

                if (category && !categories.some((cat) => cat._id === category._id)) {
                    categories.push(category);
                }
            }
        });
        return categories;
    };
    if (!data) {
        return null;
    }
    const categories = findCategories(data.categoriesIds || []);
    return (
        <>
            {categories.map((category, index) => (
                <Box sx={style} key={index} w='fit-content'>
                    <Image src={`${IMAGE_BASED_PATH}${category?.icon}`} w='16px' h='16px' />
                    <Text fontSize='14px' fontWeight={400} fontFamily='text' noOfLines={1}>
                        {category?.title}
                    </Text>
                </Box>
            ))}
        </>
    );
}

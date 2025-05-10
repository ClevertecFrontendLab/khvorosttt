import { Box, Card, CardBody, Flex, Heading, Hide, Image, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { IMAGE_BASED_PATH } from '~/data/consts';
import { recipeI } from '~/interfaces/recipeI';
import { selectedCategories } from '~/services/features/selectors';

import { useCategoryContext } from '../CategoryContext/CategoryContext';
import { CategoryMarker } from '../CategoryMarker/CategoryMarker';
import { Interactions } from '../Interactions/Interactions';
import {
    CardBodyStyle,
    CardHeadStyle,
    CardStyle,
    CardTagMobileElementsStyle,
    CardTagMobileStyle,
    MarkerStyle,
} from './CardNew.style';

export type CardNewInfo = {
    title: string;
    src: string;
    description: string;
    marker: string;
    bookmark: number;
    like: number;
};

export type CardNewType = {
    data: CardNewInfo;
    recipe: recipeI;
};

export function CardNew(recipe: recipeI) {
    const navigate = useNavigate();
    const categoriesSavedData = useSelector(selectedCategories);
    const { selectCategory, selectSubcategory } = useCategoryContext();
    const findCategories = (categoriesIds: string) => {
        const subcategory = categoriesSavedData.subcategories.find(
            (item) => item._id === categoriesIds,
        );
        const category = categoriesSavedData.categories.find(
            (item) => item._id === subcategory?.rootCategoryId,
        );
        category ? selectCategory(category._id) : null;
        subcategory ? selectSubcategory(subcategory._id) : null;
        console.log(category, subcategory);
        return { category, subcategory };
    };

    return (
        <Card
            onClick={() => {
                const { category, subcategory } = findCategories(recipe.categoriesIds[0]);
                navigate(`/${category?.category}/${subcategory?.category}/${recipe._id}`);
            }}
            sx={CardStyle}
            position='relative'
            transition='all 0.2s ease'
            _hover={{
                boxShadow: 'lg',
            }}
        >
            <Flex sx={CardTagMobileStyle}>
                <Box sx={CardTagMobileElementsStyle}>
                    <CategoryMarker style={MarkerStyle} data={recipe} />
                </Box>
            </Flex>
            <CardBody w='100%' padding={0} display='flex' flexDirection='column'>
                <Image
                    src={`${IMAGE_BASED_PATH}${recipe.image}`}
                    alt={recipe.title}
                    w='100%'
                    minH='158px'
                    maxH='230px'
                    objectFit='cover'
                />
                <Flex sx={CardBodyStyle} direction='column'>
                    <Box mb='10px'>
                        <Heading sx={CardHeadStyle}>{recipe.title}</Heading>
                        <Hide below='lg'>
                            <Text noOfLines={3} mt='4px' fontSize='14px'>
                                {recipe.description}
                            </Text>
                        </Hide>
                    </Box>
                    <Flex justifyContent='space-between' mt='auto'>
                        <Hide below='xl'>
                            <Box sx={CardTagMobileElementsStyle}>
                                <CategoryMarker style={MarkerStyle} data={recipe} />
                            </Box>
                        </Hide>
                        <Interactions {...recipe} />
                    </Flex>
                </Flex>
            </CardBody>
        </Card>
    );
}

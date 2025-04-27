import { Box, Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { AuthorRecipe } from '~/components/AuthorRecipe/AuthorRecipe';
import { compareDate } from '~/data/comparators';
import { recipeI } from '~/data/interface/data';
import menuRecipes from '~/data/menuData.json';
import { Calories } from '~/sections/Calories/Calories';
import { Ingredients } from '~/sections/Ingredients/Ingredients';
import { NewRecipes } from '~/sections/NewRecipes/NewRecipes';
import { RecipeDescription } from '~/sections/RecipeDescription/RecipeDescription';
import { StepsCooking } from '~/sections/StepsCooking/StepsCooking';

export function Recipe() {
    const { id } = useParams();
    const data: recipeI = menuRecipes.filter((recipe) => recipe.id === Number(id))[0];
    return (
        <Box w='100%' p='90px 0px'>
            <Flex direction='column' alignItems='center' gap='40px'>
                <RecipeDescription {...data} />
                <Flex
                    w={{ base: '100%', md: '82%', xl: '76%', '3xl': '52%' }}
                    alignItems='center'
                    direction='column'
                    gap='40px'
                    p='0px 20px'
                >
                    <Calories {...data.nutritionValue} />
                    <Ingredients data={data.ingredients} />
                    <StepsCooking data={data.steps} />
                    <AuthorRecipe name='Сергей Разумов' image='' email='@serge25' followers={554} />
                </Flex>
                <Box w='100%'>
                    <NewRecipes data={[...menuRecipes].sort(compareDate).slice(0, 10)} />
                </Box>
            </Flex>
        </Box>
    );
}

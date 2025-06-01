import { Box, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import { useGetRecipeByIdQuery } from '~/api/recipeApi';
import { AuthorRecipe } from '~/components/AuthorRecipe/AuthorRecipe';
import { Loader } from '~/components/Loader/Loader';
import { Calories } from '~/sections/Calories/Calories';
import { Ingredients } from '~/sections/Ingredients/Ingredients';
import { NewRecipes } from '~/sections/NewRecipes/NewRecipes';
import { RecipeDescription } from '~/sections/RecipeDescription/RecipeDescription';
import { StepsCooking } from '~/sections/StepsCooking/StepsCooking';
import { setNotification } from '~/services/features/notificationSlice';

export function Recipe() {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id, { skip: id === undefined });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            dispatch(
                setNotification({
                    title: 'Ошибка сервера',
                    description: 'Попробуйте поискать снова попозже',
                    typeN: 'error',
                }),
            );
            navigate(-1);
        }
    }, [isError, dispatch, navigate]);

    if (isLoading) {
        return <Loader />;
    }

    if (!data) {
        return null;
    }

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
                    <Ingredients data={data.ingredients} portion={data.portions} />
                    <StepsCooking data={data.steps} />
                    <AuthorRecipe name='Сергей Разумов' image='' email='@serge25' followers={554} />
                </Flex>
                <Box w='100%'>
                    <NewRecipes />
                </Box>
            </Flex>
        </Box>
    );
}

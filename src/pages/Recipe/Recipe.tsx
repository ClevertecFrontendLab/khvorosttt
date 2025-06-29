import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';

import {
    useGetCurrentUserInfoQuery,
    useGetRecipeByIdQuery,
    useGetUserStatisticQuery,
} from '~/api/authApi';
import { AuthorRecipe } from '~/components/AuthorRecipe/AuthorRecipe';
import { bookmarksCount } from '~/components/Header/utils';
import { LikeIcon } from '~/components/Icons/LikeIcon';
import { Loader } from '~/components/Loader/Loader';
import { Calories } from '~/sections/Calories/Calories';
import { Ingredients } from '~/sections/Ingredients/Ingredients';
import { NewRecipes } from '~/sections/NewRecipes/NewRecipes';
import { RecipeDescription } from '~/sections/RecipeDescription/RecipeDescription';
import { StepsCooking } from '~/sections/StepsCooking/StepsCooking';
import { setNotification } from '~/services/features/notificationSlice';

export function Recipe() {
    const { id } = useParams();
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id, {
        skip: id === undefined /*refetchOnMountOrArgChange: true,*/,
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: statistic } = useGetUserStatisticQuery();
    const { data: user } = useGetCurrentUserInfoQuery();
    const [isRecommended, setRecommented] = useState(
        statistic?.recipesWithRecommendations.findIndex((r) => r._id === id),
    );

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
                    <AuthorRecipe authorId={data.authorId} />
                    {bookmarksCount(statistic?.bookmarks) > 200 &&
                        (user ? user.subscribers.length : 0) > 100 && (
                            <Button
                                onClick={() => {
                                    setRecommented(-1);
                                }}
                                w='100'
                                bg='black'
                                borderRadius='6px'
                            >
                                <LikeIcon color='green' />
                                <Text>
                                    {!isRecommended ? 'Рекомендовать рецепт' : 'Вы порекомендовали'}
                                </Text>
                            </Button>
                        )}
                </Flex>
                <Box w='100%'>
                    <NewRecipes />
                </Box>
            </Flex>
        </Box>
    );
}

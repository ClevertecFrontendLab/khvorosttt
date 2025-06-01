import { Box, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useAddDraftMutation, useAddRecipeMutation } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';
import { ingredientsI, ingredientsOptionalI, stepsI, stepsOptionalI } from '~/interfaces/recipeI';
import { setNotification } from '~/services/features/notificationSlice';
import { selectedCategories } from '~/services/features/selectors';
import { getUserIdFromToken } from '~/services/utils';

import { RecipeButtons } from './components/RecipeButtons/RecipeButtons';
import { RecipeImageUpload } from './components/RecipeImageUpload/RecipeImageUpload';
import { RecipeIngredients } from './components/RecipeIngredients/RecipeIngredients';
import { RecipeMainInfo } from './components/RecipeMainInfo/RecipeMainInfo';
import { RecipeSteps } from './components/RecipeStep/RecipeSteps';
import { schema } from './shema/shema';

export type RecipeInputs = {
    title: string;
    description: string;
    time: number;
    portions: number;
    categoriesIds: string[];
    image: string;
    ingredients: ingredientsI[];
    steps: stepsI[];
};

export type RecipeInputsOptional = {
    title: string;
    description?: string | null;
    time?: number | null;
    portions?: number | null;
    categoriesIds?: string[] | null;
    image?: string | null;
    ingredients?: ingredientsOptionalI[];
    steps?: stepsOptionalI[];
};

export function NewRecipe() {
    getUserIdFromToken();
    const methods = useForm<RecipeInputs>({
        mode: 'onSubmit',
        shouldFocusError: false,
        resolver: yupResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            time: 0,
            portions: 1,
            categoriesIds: [],
            image: '',
            ingredients: [{ title: '', count: 1, measureUnit: '' }],
            steps: [{ stepNumber: 1, description: '', image: '' }],
        },
    });
    const [addRecipe, { isLoading: publishLoading }] = useAddRecipeMutation();
    const [addDraft, { isLoading: draftLoading }] = useAddDraftMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const categoriesSavedData = useSelector(selectedCategories);

    function normalizeRecipeData(data: RecipeInputs): RecipeInputs {
        return {
            ...data,
            steps: data.steps.map((step) => ({
                ...step,
                image: step.image || null,
            })),
        };
    }

    function normalizeRecipeDataOptianal(data: RecipeInputs): RecipeInputsOptional {
        return {
            ...data,
            description: data.description || null,
            time: data.time || null,
            portions: data.portions || null,
            categoriesIds: data.categoriesIds || null,
            image: data.image || null,
            steps: data.steps.map((step) => ({
                ...step,
                image: step.image || null,
                description: step.description || null,
            })),
            ingredients: data.ingredients.map((i) => ({
                ...i,
                title: i.title || null,
                count: i.count || null,
                measureUnit: i.measureUnit || null,
            })),
        };
    }

    const publishRecipe = (data: RecipeInputs) => {
        const normalizedData = normalizeRecipeData(data);
        console.log('nbhvgfcdxs');
        addRecipe(normalizedData)
            .unwrap()
            .then((res) => {
                const subcategoryName = categoriesSavedData.subcategories.find(
                    (item) => item._id === data.categoriesIds[0],
                );
                const category = categoriesSavedData.categories.find(
                    (item) => item._id === subcategoryName?.rootCategoryId,
                );
                navigate(`/${category?.category}/${subcategoryName?.category}/${res._id}`);
                dispatch(
                    setNotification({
                        title: 'Рецепт успешно опубликован',
                        description: '',
                        typeN: 'success',
                    }),
                );
            })
            .catch((error) => {
                if (error.status === 500) {
                    dispatch(
                        setNotification({
                            title: 'Ошибка сервера',
                            description: 'Попробуйте пока сохранить в черновик.',
                            typeN: 'error',
                        }),
                    );
                } else if (error.status === 409) {
                    dispatch(
                        setNotification({
                            title: 'Ошибка',
                            description: 'Рецепт с таким названием уже существует.',
                            typeN: 'error',
                        }),
                    );
                }
            });
    };

    const handleSaveDraft = async () => {
        const isValid = await methods.trigger('title');
        if (isValid) {
            const formData = methods.getValues();
            const normalizedData = normalizeRecipeDataOptianal(formData);
            addDraft(normalizedData)
                .unwrap()
                .then(() => {
                    navigate(`/`);
                    dispatch(
                        setNotification({
                            title: 'Черновик успешно сохранен',
                            description: '',
                            typeN: 'success',
                        }),
                    );
                })
                .catch((error) => {
                    if (error.status === 500) {
                        dispatch(
                            setNotification({
                                title: 'Ошибка сервера',
                                description: 'Не удалось сохранить черновик рецепта',
                                typeN: 'error',
                            }),
                        );
                    } else if (error.status === 409) {
                        dispatch(
                            setNotification({
                                title: 'Ошибка',
                                description: 'Рецепт с таким названием уже существует.',
                                typeN: 'error',
                            }),
                        );
                    }
                });
        }
    };

    return (
        <Box
            w='100%'
            paddingTop={{ base: '90px' }}
            paddingBottom={{ base: '90px' }}
            paddingLeft={{ base: '16px', lg: '24px' }}
            paddingRight={{ base: '16px', ms: '0px' }}
        >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(publishRecipe)} data-test-id='recipe-form'>
                    {(publishLoading || draftLoading) && <Loader />}
                    <Flex flexDirection='column' gap='40px' alignItems='center'>
                        <Flex
                            gap={{ base: '16px', lg: '24px' }}
                            flexDirection={{ base: 'column', md: 'row' }}
                        >
                            <RecipeImageUpload />
                            <RecipeMainInfo />
                        </Flex>
                        <Flex
                            flexDirection='column'
                            w={{ base: '328px', md: '604px', '2xl': '668px' }}
                            gap='40px'
                        >
                            <RecipeIngredients />
                            <RecipeSteps />
                            <RecipeButtons onSaveDraft={handleSaveDraft} />
                        </Flex>
                    </Flex>
                </form>
            </FormProvider>
        </Box>
    );
}

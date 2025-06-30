import { Box, Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useBlocker, useLocation, useNavigate, useParams } from 'react-router';

import {
    useAddDraftMutation,
    useUpdateDraftMutation,
    useUpdateRecipeMutation,
} from '~/api/authApi';
import { useGetRecipeByIdQuery } from '~/api/authApi';
import { Loader } from '~/components/Loader/Loader';
import { setNotification } from '~/services/features/notificationSlice';
import { selectedCategories } from '~/services/features/selectors';

import { PreventiveModal } from './components/modals/PreventiveModal';
import { RecipeButtons } from './components/RecipeButtons/RecipeButtons';
import { RecipeImageUpload } from './components/RecipeImageUpload/RecipeImageUpload';
import { RecipeIngredients } from './components/RecipeIngredients/RecipeIngredients';
import { RecipeMainInfo } from './components/RecipeMainInfo/RecipeMainInfo';
import { RecipeSteps } from './components/RecipeStep/RecipeSteps';
import { RecipeInputs, RecipeInputsOptional } from './NewRecipe';
import { schema } from './shema/shema';

export function EditRecipe() {
    const { '*': pathTail } = useParams();
    const id = pathTail?.split('/').pop() ?? '';
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const draftData = location.state?.draftData;

    const methods = useForm<RecipeInputs>({
        mode: 'onSubmit',
        shouldFocusError: false,
        resolver: yupResolver(schema),
    });

    const {
        formState: { isDirty },
    } = methods;

    const { data, isLoading } = useGetRecipeByIdQuery(id /*{refetchOnMountOrArgChange: true}*/);
    const [updateRecipe, { isLoading: updating }] = useUpdateRecipeMutation();
    const categoriesSavedData = useSelector(selectedCategories);
    const [addDraft] = useAddDraftMutation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isEditingDraft = !!draftData?._id;
    const [updateDraft] = useUpdateDraftMutation();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
            isDirty && !isSubmitting && currentLocation.pathname !== nextLocation.pathname,
    );

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setPendingNavigation(blocker.location.pathname);
            onOpen();
        }
    }, [blocker, onOpen]);

    const handleConfirmNavigation = () => {
        onClose();
        if (pendingNavigation) {
            if (blocker.proceed) {
                blocker.proceed();
            }
        }
        setPendingNavigation(null);
    };

    const handleCancelNavigation = () => {
        onClose();
        setPendingNavigation(null);
        blocker?.reset?.();
    };

    const handleSaveDraft = async (data: RecipeInputs): Promise<void> => {
        const isValid = await methods.trigger('title');

        if (!isValid) {
            onClose();
            return;
        }

        const normalizedData = normalizeRecipeDataOptianal(data);

        try {
            if (isEditingDraft) {
                await updateDraft({ id: draftData._id, data: normalizedData }).unwrap();
            } else {
                await addDraft(normalizedData).unwrap();
            }

            dispatch(
                setNotification({
                    title: isEditingDraft ? 'Черновик обновлён' : 'Черновик сохранён',
                    description: '',
                    typeN: 'success',
                }),
            );

            onClose();

            methods.reset(
                {
                    title: '',
                    description: '',
                    time: 0,
                    portions: 1,
                    categoriesIds: [],
                    image: '',
                    ingredients: [{ title: '', count: 1, measureUnit: '' }],
                    steps: [{ stepNumber: 1, description: '', image: '' }],
                },
                { keepDirty: false },
            );

            handleConfirmNavigation();
        } catch (error) {
            const defaultError = {
                title: 'Ошибка сервера',
                description: 'Не удалось сохранить черновик рецепта',
                typeN: 'error',
            };

            if (typeof error === 'object' && error !== null && 'status' in error) {
                if ((error as { status?: number }).status === 409) {
                    defaultError.title = 'Ошибка';
                    defaultError.description = 'Рецепт с таким названием уже существует.';
                }
            }

            dispatch(setNotification(defaultError));
            onClose();
        }
    };

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

    useEffect(() => {
        if (data) {
            methods.reset(data);
        }
        if (draftData) {
            methods.reset(draftData);
        }
    }, [data, draftData]);

    const handleUpdate = (formData: RecipeInputs) => {
        setIsSubmitting(true);
        updateRecipe({ id, data: formData })
            .unwrap()
            .then(() => {
                const subcategoryName = categoriesSavedData.subcategories.find(
                    (item) => item._id === formData.categoriesIds[0],
                );
                const category = categoriesSavedData.categories.find(
                    (item) => item._id === subcategoryName?.rootCategoryId,
                );

                navigate(`/${category?.category}/${subcategoryName?.category}/${id}`);
                dispatch(
                    setNotification({
                        title: 'Рецепт успешно опубликован',
                        typeN: 'success',
                        description: '',
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
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    };

    if (isLoading || updating) return <Loader />;

    return (
        <Box
            w='100%'
            paddingTop={{ base: '90px' }}
            paddingBottom={{ base: '90px' }}
            paddingLeft={{ base: '16px', lg: '24px' }}
            paddingRight={{ base: '16px', ms: '0px' }}
        >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(handleUpdate)} data-test-id='recipe-form'>
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
                    <PreventiveModal
                        isOpen={isOpen}
                        onClose={handleCancelNavigation}
                        onSaveDraft={handleSaveDraft}
                        onConfirmOut={handleConfirmNavigation}
                    />
                </form>
            </FormProvider>
        </Box>
    );
}

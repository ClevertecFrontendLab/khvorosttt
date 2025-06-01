import { Box, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ingredientsI, stepsI } from '~/interfaces/recipeI';

import { RecipeButtons } from './components/RecipeButtons/RecipeButtons';
import { RecipeImageUpload } from './components/RecipeImageUpload/RecipeImageUpload';
import { RecipeIngredients } from './components/RecipeIngredients/RecipeIngredients';
import { RecipeMainInfo } from './components/RecipeMainInfo/RecipeMainInfo';
import { RecipeSteps } from './components/RecipeStep/RecipeSteps';
import { schema } from './shema/shema';

type RecipeInputs = {
    mainImg: string;
    title: string;
    description: string;
    portions: number;
    time: number;
    categoriesIds: string[];
    ingredients: ingredientsI[];
    steps: stepsI[];
};

export function NewRecipe() {
    const methods = useForm<RecipeInputs>({
        mode: 'onSubmit',
        shouldFocusError: false,
        resolver: yupResolver(schema),
        defaultValues: {
            mainImg: '',
            ingredients: [{ title: '', count: 1, measureUnit: '' }],
            steps: [{ stepNumber: 1, description: '', image: '' }],
        },
    });

    return (
        <Box
            w='100%'
            paddingTop={{ base: '90px' }}
            paddingBottom={{ base: '90px' }}
            paddingLeft={{ base: '16px', lg: '24px' }}
            paddingRight={{ base: '16px', ms: '0px' }}
        >
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(console.log)} data-test-id='recipe-form'>
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
                            <RecipeButtons />
                        </Flex>
                    </Flex>
                </form>
            </FormProvider>
        </Box>
    );
}

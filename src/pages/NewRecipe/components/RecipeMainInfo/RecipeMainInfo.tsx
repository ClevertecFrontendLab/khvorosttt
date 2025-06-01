import {
    Flex,
    FormControl,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Textarea,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';

import { RecipeCategories } from './RecipeCategories/RecipeCategories';

export function RecipeMainInfo() {
    return (
        <Flex flexDirection='column' gap={{ base: '16px', lg: '32px' }}>
            <RecipeCategories />
            <RecipeTitle />
            <RecipeDescription />
            <RecipePortions />
            <RecipeTime />
        </Flex>
    );
}

export function RecipeTitle() {
    const {
        field,
        formState: { errors },
    } = useController({ name: 'title' });

    return (
        <FormControl isInvalid={!!errors.title}>
            <Input
                {...field}
                placeholder='Название рецепта'
                data-test-id='recipe-title'
                border='1px solid #d7ff94'
                borderRadius='6px'
                p='0px 16px'
            />
        </FormControl>
    );
}

export function RecipeDescription() {
    const {
        field,
        formState: { errors },
    } = useController({ name: 'description' });

    return (
        <FormControl isInvalid={!!errors.description}>
            <Textarea
                {...field}
                placeholder='Краткое описание рецепта'
                data-test-id='recipe-description'
                h='80px'
                border='1px solid #e2e8f0'
                borderRadius='6px'
                onBlur={(e) => {
                    e.target.value = e.target.value.trim();
                }}
            />
        </FormControl>
    );
}

export function RecipePortions() {
    const {
        field,
        formState: { errors },
    } = useController({ name: 'portions' });

    return (
        <FormControl
            isInvalid={!!errors.portions}
            display='flex'
            flexDirection='row'
            alignItems='center'
        >
            <FormLabel>На сколько человек ваш рецепт?</FormLabel>
            <NumberInput size='md' w='90px' max={50} step={1}>
                <NumberInputField {...field} data-test-id='recipe-portions' />
                <NumberInputStepper w='24px' h='40px'>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    );
}

export function RecipeTime() {
    const {
        field,
        formState: { errors },
    } = useController({ name: 'time' });

    return (
        <FormControl
            isInvalid={!!errors.time}
            display='flex'
            flexDirection='row'
            alignItems='center'
        >
            <FormLabel>Сколько времени готовить в минутах?</FormLabel>
            <NumberInput size='md' w='90px' step={1}>
                <NumberInputField {...field} data-test-id='recipe-time' />
                <NumberInputStepper w='24px' h='40px'>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </FormControl>
    );
}

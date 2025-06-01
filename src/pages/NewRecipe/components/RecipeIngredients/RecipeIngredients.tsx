import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex, FormControl, FormLabel, IconButton, Input, Select } from '@chakra-ui/react';
import { useController, useFieldArray } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useMeasureUnitsQuery } from '~/api/authApi';
import { MeasureUnitsI } from '~/interfaces/recipeI';
import { setNotification } from '~/services/features/notificationSlice';

export function RecipeIngredients() {
    const { fields, append, remove } = useFieldArray({
        name: 'ingredients',
    });
    const dispatch = useDispatch();
    const { data: measureUnits, isError: measureUnitError } = useMeasureUnitsQuery();

    if (measureUnitError) {
        dispatch(
            setNotification({
                title: 'Что-то пошло не так',
                description: ``,
                typeN: 'error',
            }),
        );
    }

    return (
        <FormControl>
            <FormLabel display='flex' alignItems='center' gap='8px'>
                Добавьте ингредиенты рецепта, нажав на{' '}
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='50px'
                    border='1px solid black'
                    w='16px'
                    h='16px'
                >
                    <AddIcon w='8px' color='black' />
                </Flex>
            </FormLabel>
            {fields.map((field, index) => (
                <IngredientRow
                    key={field.id}
                    index={index}
                    measureUnits={measureUnits}
                    onRemove={() => remove(index)}
                    isLast={index === fields.length - 1}
                    onAdd={() => append({ title: '', count: 1, measureUnit: '' })}
                />
            ))}
        </FormControl>
    );
}

function IngredientRow({
    index,
    measureUnits,
    onRemove,
    isLast,
    onAdd,
}: {
    index: number;
    measureUnits: MeasureUnitsI[] | undefined;
    onRemove: () => void;
    isLast: boolean;
    onAdd: () => void;
}) {
    const {
        field: titleField,
        fieldState: { error: titleError },
    } = useController({
        name: `ingredients.${index}.title`,
    });

    const {
        field: countField,
        fieldState: { error: countError },
    } = useController({
        name: `ingredients.${index}.count`,
    });

    const {
        field: measureUnitField,
        fieldState: { error: measureUnitError },
    } = useController({
        name: `ingredients.${index}.measureUnit`,
    });

    return (
        <Flex gap='12px' flexDirection={{ base: 'column', md: 'row' }} mb={4}>
            <FormControl isInvalid={!!titleError}>
                <Input
                    {...titleField}
                    placeholder='Ингредиент'
                    data-test-id={`recipe-ingredients-title-${index}`}
                />
            </FormControl>

            <Flex gap='12px'>
                <FormControl isInvalid={!!countError} w='80px'>
                    <Input
                        type='number'
                        {...countField}
                        placeholder='100'
                        data-test-id={`recipe-ingredients-count-${index}`}
                    />
                </FormControl>

                <FormControl isInvalid={!!measureUnitError}>
                    <Select
                        placeholder='Выберите единицу измерения'
                        {...measureUnitField}
                        data-test-id={`recipe-ingredients-measureUnit-${index}`}
                        value={measureUnitField.value || ''}
                    >
                        {measureUnits?.map((unit) => (
                            <option key={unit._id} value={unit._id}>
                                {unit.name}
                            </option>
                        ))}
                    </Select>
                </FormControl>

                {!isLast ? (
                    <IconButton
                        icon={<DeleteIcon color='#2db100' />}
                        onClick={onRemove}
                        aria-label='Удалить ингредиент'
                        variant='ghost'
                        data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
                    />
                ) : (
                    <Button
                        borderRadius='50px'
                        bg='black'
                        onClick={onAdd}
                        data-test-id='recipe-ingredients-add-ingredients'
                        minW='40px'
                    >
                        <AddIcon color='white' />
                    </Button>
                )}
            </Flex>
        </Flex>
    );
}

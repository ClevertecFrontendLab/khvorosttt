import { AddIcon } from '@chakra-ui/icons';
import { Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';
import { useFieldArray } from 'react-hook-form';

import { StepRow } from './StepRow';

export function RecipeSteps() {
    const { fields, append, remove } = useFieldArray({
        name: 'steps',
    });

    return (
        <FormControl>
            <FormLabel>Добавьте шаги приготовления</FormLabel>
            {fields.map((field, index) => (
                <StepRow
                    key={field.id}
                    index={index}
                    onRemove={() => remove(index)}
                    isFirst={index === 0}
                />
            ))}
            <Button
                onClick={() =>
                    append({ stepNumber: fields.length + 1, description: '', image: '' })
                }
                display='flex'
                alignContent='center'
                gap='10px'
                variant='outline'
                colorScheme='black'
                justifySelf='end'
            >
                Новый шаг{' '}
                <Flex
                    alignItems='center'
                    justifyContent='center'
                    borderRadius='50px'
                    border='1px solid black'
                    bg='black'
                    w='16px'
                    h='16px'
                >
                    <AddIcon w='8px' color='white' />
                </Flex>
            </Button>
        </FormControl>
    );
}

import {
    Box,
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import { ingredientsI } from '~/interfaces/recipeI';

import { TableHeadStyle } from './Ingredients.style';

export function Ingredients({ data, portion }: { data: ingredientsI[]; portion: number }) {
    const [count, setCount] = useState(portion);
    return (
        <Flex direction='column' w='100%'>
            <Box overflowX='auto'>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th p='12px'>
                                <Text sx={TableHeadStyle}>ИНГРЕДИЕНТЫ</Text>
                            </Th>
                            <Th p='12px' pr='0px'>
                                <Flex alignItems='center' gap='16px' justifyContent='flex-end'>
                                    <Text sx={TableHeadStyle}>ПОРЦИЙ</Text>
                                    <NumberInput
                                        size='md'
                                        w='90px'
                                        value={count}
                                        min={1}
                                        max={50}
                                        step={1}
                                        onChange={(value) => setCount(Number(value))}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper w='24px' h='40px'>
                                            <NumberIncrementStepper data-test-id='increment-stepper' />
                                            <NumberDecrementStepper data-test-id='decrement-stepper' />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((ingredient, index) => (
                            <Tr key={index} bg={index % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : 'white'}>
                                <Td
                                    color='rgba(0, 0, 0, 0.92)'
                                    fontWeight={500}
                                    fontSize='14px'
                                    p='12px'
                                >
                                    {ingredient.title}
                                </Td>
                                <Td
                                    textAlign='right'
                                    color='rgba(0, 0, 0, 0.92)'
                                    fontWeight={400}
                                    fontSize='14px'
                                    display='flex'
                                    gap='3px'
                                    justifyContent='flex-end'
                                    p='12px'
                                >
                                    <Text data-test-id={`ingredient-quantity-${index}`}>
                                        {ingredient.count
                                            ? (count * ingredient.count) / portion
                                            : 0}
                                    </Text>
                                    <Text>{ingredient.measureUnit}</Text>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
}

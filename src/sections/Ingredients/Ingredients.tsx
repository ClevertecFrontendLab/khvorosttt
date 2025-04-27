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

import { ingredientsI } from '~/data/interface/data';

export function Ingredients({ data }: { data: ingredientsI[] }) {
    const [count, setCount] = useState(1);
    return (
        <Flex direction='column' w='100%'>
            <Box overflowX='auto'>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>
                                <Text
                                    color='#2db100'
                                    fontStyle='text'
                                    fontWeight={700}
                                    fontSize='12px'
                                >
                                    ИНГРЕДИЕНТЫ
                                </Text>
                            </Th>
                            <Th pr='0px'>
                                <Flex alignItems='center' gap='16px' justifyContent='flex-end'>
                                    <Text
                                        color='#2db100'
                                        fontStyle='text'
                                        fontWeight={700}
                                        fontSize='12px'
                                    >
                                        ПОРЦИЙ
                                    </Text>
                                    <NumberInput
                                        size='md'
                                        w='90px'
                                        value={count}
                                        min={1}
                                        max={50}
                                        onChange={(value) => setCount(Number(value))}
                                    >
                                        <NumberInputField />
                                        <NumberInputStepper w='24px' h='40px'>
                                            <NumberIncrementStepper
                                                onClick={() => setCount((value) => ++value)}
                                            />
                                            <NumberDecrementStepper
                                                onClick={() => setCount((value) => --value)}
                                            />
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Flex>
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map((ingredient, index) => (
                            <Tr key={index} bg={index % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : 'white'}>
                                <Td color='rgba(0, 0, 0, 0.92)' fontWeight={500} fontSize='14px'>
                                    {ingredient.title}
                                </Td>
                                <Td
                                    textAlign='right'
                                    color='rgba(0, 0, 0, 0.92)'
                                    fontWeight={400}
                                    fontSize='14px'
                                >
                                    {ingredient.count ? count * ingredient.count : null}{' '}
                                    {ingredient.measureUnit}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
        </Flex>
    );
}

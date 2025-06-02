import { ChevronDownIcon } from '@chakra-ui/icons';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormLabel,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { useController } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { selectedCategories } from '~/services/features/selectors';

import { ShowTags } from './ShowTags/ShowTags';

export function RecipeCategories() {
    const categoriesData = useSelector(selectedCategories);
    const subcategories = categoriesData.subcategories;
    const {
        field,
        formState: { errors },
    } = useController({
        name: 'categoriesIds',
    });

    return (
        <FormControl
            isInvalid={!!errors.categoriesIds}
            display='flex'
            flexDirection='row'
            alignItems='center'
            data-test-id='recipe-categories'
        >
            <FormLabel fontFamily='text' fontSize='16px' fontWeight={600}>
                Выберите не менее 3-х тегов
            </FormLabel>
            <Box w={{ base: '196px', md: '232px', '2xl': '350px' }}>
                <Menu matchWidth>
                    <MenuButton
                        as={Button}
                        p='8px 16px'
                        variant='none'
                        rightIcon={<ChevronDownIcon />}
                        textAlign='left'
                        w={{ base: '196px', md: '232px', xl: '350px' }}
                        fontWeight={400}
                        fontFamily='text'
                        fontSize='16px'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        {field.value?.length ? (
                            <ShowTags categoryIds={field.value} />
                        ) : (
                            'Выберите из списка...'
                        )}
                    </MenuButton>
                    <MenuList
                        maxH='424px'
                        overflowY='auto'
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '8px',
                            },
                            '&::-webkit-scrollbar-track': {
                                bg: 'gray.100',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                bg: '#b1ff2e',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb:hover': {
                                bg: '#b1ff2e',
                            },
                        }}
                    >
                        {subcategories.map((sub, index) => (
                            <MenuItem
                                key={sub._id}
                                closeOnSelect={false}
                                bg={index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.06)'}
                                borderRadius={0}
                            >
                                <Checkbox
                                    isChecked={field.value?.includes(sub._id)}
                                    onChange={() => {
                                        const newValue = field.value?.includes(sub._id)
                                            ? field.value.filter((id: string) => id !== sub._id)
                                            : [...(field.value || []), sub._id];
                                        field.onChange(newValue);
                                    }}
                                    p='6px 16px'
                                    w='100%'
                                    fontSize='14px'
                                    fontWeight={400}
                                    color='#1a202c'
                                    borderColor='#b1ff2e'
                                    iconColor='black'
                                    sx={{
                                        '.chakra-checkbox__control': {
                                            _checked: {
                                                bg: '#b1ff2e',
                                                borderColor: '#b1ff2e',
                                            },
                                        },
                                    }}
                                >
                                    {sub.title}
                                </Checkbox>
                            </MenuItem>
                        ))}
                    </MenuList>
                </Menu>
            </Box>
        </FormControl>
    );
}

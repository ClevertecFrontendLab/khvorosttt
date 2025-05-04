import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { markerFood } from '~/data/consts';
import {
    addAuthor,
    addCategories,
    removeAuthor,
    removeCategories,
} from '~/services/features/filtersSlice';
import { selectedFilters } from '~/services/features/selectors';

export interface SelectorProps {
    type: string;
    placeholder: string;
    items: string[];
}

export function Selector({ type, placeholder, items }: SelectorProps) {
    const dispatch = useDispatch();
    const { drawer } = useSelector(selectedFilters);

    const handleCheckboxChange = (value: string) => {
        if (type === 'category') {
            if (drawer.selectedCategories.includes(value)) {
                dispatch(removeCategories(value));
            } else {
                dispatch(addCategories(value));
            }
        } else {
            if (drawer.selectedAuthors.includes(value)) {
                dispatch(removeAuthor(value));
            } else {
                dispatch(addAuthor(value));
            }
        }
    };
    return (
        <Menu matchWidth>
            <MenuButton
                as={Button}
                sx={{
                    variant: 'outline',
                    bg: 'transparent',
                    fontWeight: 400,
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, 0.64)',
                    fontFamily: 'text',
                    w: '100%',
                    p: '8px 16px',
                    textAlign: 'left',
                }}
                rightIcon={<ChevronDownIcon />}
                h='40px'
                data-test-id={type === 'category' ? 'filter-menu-button-категория' : ''}
            >
                {placeholder}
            </MenuButton>
            <MenuList zIndex={2} w='100%' minW='unset' p='4px 0px'>
                {items.map((item, index) => (
                    <MenuItem
                        key={index}
                        closeOnSelect={false}
                        bg={index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.06)'}
                        borderRadius={0}
                    >
                        <Checkbox
                            isChecked={
                                type === 'category'
                                    ? drawer.selectedCategories.includes(item)
                                    : drawer.selectedAuthors.includes(item)
                            }
                            onChange={() => handleCheckboxChange(item)}
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
                            data-test-id={item === 'vegan' ? 'checkbox-веганская кухня' : ''}
                        >
                            {type === 'category' ? markerFood[item] : item}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

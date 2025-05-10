import { ChevronDownIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
    Button,
    Checkbox,
    Flex,
    IconButton,
    Input,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Stack,
    Switch,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { allergensRus } from '~/data/consts';
import { selectedFilters } from '~/services/features/selectors';

import { AddNewAllergensBtnStyle, AddNewStyle, MenuButtonStyle } from './allergens.style';

export interface AllergensProps {
    type: string;
    isActive: boolean;
    setActive: () => void;
    selected: string[];
    handleFunc: (value: string) => void;
}

export function Allergens({ type, isActive, setActive, selected, handleFunc }: AllergensProps) {
    const filters = useSelector(selectedFilters);
    const [allergensList] = useState([...allergensRus]);
    const [newAllergen, setNewAllergen] = useState('');

    const handleAddAllergen = () => {
        const newallergen = newAllergen.trim();

        if (newallergen) {
            handleFunc(newallergen);
        }
        setNewAllergen('');
    };

    return (
        <Stack direction={type === 'filter' ? 'column' : 'row'}>
            <Flex
                justifyContent={type === 'filter' ? 'flex-start' : 'center'}
                alignItems='center'
                gap='10px'
            >
                <Text fontWeight={500} fontSize='16px' fontFamily='text'>
                    Исключить мои аллергены
                </Text>
                <Switch
                    size='sm'
                    fill='#b1ff2e'
                    onChange={setActive}
                    data-test-id={
                        type === 'filter' ? `allergens-switcher-${type}` : 'allergens-switcher'
                    }
                    sx={{
                        '.chakra-switch__track': {
                            _checked: {
                                bg: '#b1ff2e',
                            },
                        },
                    }}
                />
            </Flex>
            <Menu matchWidth closeOnSelect={false}>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    sx={MenuButtonStyle}
                    w={type === 'filter' ? '100%' : '269px'}
                    isDisabled={!isActive}
                    border={
                        filters.allergensActive
                            ? '1px solid #b1ff2e'
                            : '1px solid rgba(0, 0, 0, 0.08)'
                    }
                    data-test-id={
                        type === 'filter'
                            ? `allergens-menu-button-${type}`
                            : 'allergens-menu-button'
                    }
                >
                    {type === 'filter' ? (
                        'Выберите из списка...'
                    ) : !selected.length ? (
                        'Выберите из списка...'
                    ) : (
                        <Flex wrap='wrap' gap='4px'>
                            {selected.map((item, index) => (
                                <Text
                                    border='1px solid #b1ff2e'
                                    borderRadius='6px'
                                    p='4px 8px'
                                    color='#2db100'
                                    fontSize='12px'
                                    fontWeight={500}
                                    fontFamily='text'
                                    key={index}
                                >
                                    {item}
                                </Text>
                            ))}
                        </Flex>
                    )}
                </MenuButton>
                <MenuList
                    zIndex={2}
                    w={type === 'filter' ? '100%' : '269px'}
                    minW='unset'
                    p='4px 0px'
                    data-test-id='allergens-menu'
                    sx={{
                        display: isActive ? 'block' : 'none',
                        visibility: isActive ? 'visible' : 'hidden',
                    }}
                >
                    {allergensList.map((item, index) => (
                        <MenuItem
                            key={index}
                            closeOnSelect={false}
                            bg={index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.06)'}
                            borderRadius={0}
                        >
                            <Checkbox
                                data-test-id={`allergen-${index}`}
                                isChecked={selected.includes(item)}
                                onChange={() => handleFunc(item)}
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
                                {item}
                            </Checkbox>
                        </MenuItem>
                    ))}
                    <Flex sx={AddNewStyle}>
                        <Input
                            data-test-id='add-other-allergen'
                            placeholder='Другой аллерген'
                            color='#134b00'
                            fontSize='14px'
                            fontWeight={400}
                            value={newAllergen}
                            onChange={(e) => setNewAllergen(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddAllergen();
                                }
                            }}
                        />
                        <IconButton
                            data-test-id='add-allergen-button'
                            aria-label='Добавить аллерген'
                            icon={<SmallAddIcon color='white' />}
                            onClick={handleAddAllergen}
                            isDisabled={!newAllergen.trim()}
                            sx={AddNewAllergensBtnStyle}
                        />
                    </Flex>
                </MenuList>
            </Menu>
        </Stack>
    );
}

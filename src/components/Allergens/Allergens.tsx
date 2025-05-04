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
import { useDispatch, useSelector } from 'react-redux';

import { allergensRus } from '~/data/consts';
import {
    addDrawerAllergen,
    addSectionAllergen,
    cleanDrawer,
    cleanSectionAllergen,
    removeDrawerAllergen,
    removeSectionAllergen,
    toggleDrawerAllergensActive,
    toggleSectionAllergensActive,
} from '~/services/features/filtersSlice';
import { selectedFilters } from '~/services/features/selectors';

import { AddNewAllergensBtnStyle, AddNewStyle, MenuButtonStyle } from './allergens.style';

export function Allergens({ type }: { type: string }) {
    const dispatch = useDispatch();
    const filters = useSelector(selectedFilters);
    const { sectionAllergens, drawer } = filters;
    const [allergensList] = useState([...allergensRus]);
    const [newAllergen, setNewAllergen] = useState('');

    const handleCheckboxChange = (value: string) => {
        if (type === 'filter') {
            if (drawer.selectedAllergens.includes(value)) {
                dispatch(removeDrawerAllergen(value));
            } else {
                dispatch(addDrawerAllergen(value));
            }
        } else {
            if (sectionAllergens.selectedAllergens.includes(value)) {
                dispatch(removeSectionAllergen(value));
            } else {
                dispatch(addSectionAllergen(value));
            }
        }
    };

    const handleAddAllergen = () => {
        const newallergen = newAllergen.trim();
        if (type === 'filter') {
            if (newallergen && !drawer.selectedAllergens.includes(newallergen)) {
                dispatch(addDrawerAllergen(newallergen));
            }
        } else {
            if (newallergen && !sectionAllergens.selectedAllergens.includes(newallergen)) {
                dispatch(addSectionAllergen(newallergen));
            }
        }
        setNewAllergen('');
    };

    const handleSwitch = () => {
        if (type === 'filter') {
            if (drawer.allergensActive) {
                dispatch(cleanDrawer());
            } else {
                dispatch(toggleDrawerAllergensActive(!drawer.allergensActive));
            }
        } else {
            if (sectionAllergens.allergensActive) {
                dispatch(cleanSectionAllergen());
            } else {
                dispatch(toggleSectionAllergensActive(!sectionAllergens.allergensActive));
            }
        }
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
                    onChange={handleSwitch}
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
            <Menu matchWidth>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    sx={MenuButtonStyle}
                    w={type === 'filter' ? '100%' : '269px'}
                    isDisabled={
                        type !== 'filter'
                            ? !sectionAllergens.allergensActive
                            : !drawer.allergensActive
                    }
                    border={
                        sectionAllergens.allergensActive
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
                    ) : !sectionAllergens.selectedAllergens.length ? (
                        'Выберите из списка...'
                    ) : (
                        <Flex wrap='wrap' gap='4px'>
                            {(type !== 'filter'
                                ? sectionAllergens.selectedAllergens
                                : drawer.selectedAllergens
                            ).map((item, index) => (
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
                                isChecked={
                                    type !== 'filter'
                                        ? sectionAllergens.selectedAllergens.includes(item)
                                        : drawer.selectedAllergens.includes(item)
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

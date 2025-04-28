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

import { allergens } from '~/data/consts';
import {
    addSectionAllergen,
    cleanSectionAllergen,
    removeSectionAllergen,
    toggleSectionAllergensActive,
} from '~/services/features/filtersSlice';
import { selectedFilters } from '~/services/features/selectors';

import { AddNewAllergensBtnStyle, AddNewStyle, MenuButtonStyle } from './allergens.style';

export function Allergens({ type }: { type: string }) {
    const dispatch = useDispatch();
    const { sectionAllergens } = useSelector(selectedFilters);
    const [allergensList] = useState([...allergens]);
    const [newAllergen, setNewAllergen] = useState('');

    const handleCheckboxChange = (value: string) => {
        if (sectionAllergens.selectedAllergens.includes(value)) {
            dispatch(removeSectionAllergen(value));
        } else {
            dispatch(addSectionAllergen(value));
        }
    };

    const handleAddAllergen = () => {
        const newallergen = newAllergen.trim();
        if (newallergen && !sectionAllergens.selectedAllergens.includes(newallergen)) {
            dispatch(addSectionAllergen(newallergen));
        }
        setNewAllergen('');
    };

    const handleSwitch = () => {
        dispatch(toggleSectionAllergensActive(!sectionAllergens.allergensActive));
        dispatch(cleanSectionAllergen());
    };

    return (
        <Stack align='center' direction='row'>
            <Text fontWeight={500} fontSize='16px' fontFamily='text'>
                Исключить мои аллергены
            </Text>
            <Switch
                size='sm'
                fill='#b1ff2e'
                onChange={handleSwitch}
                data-test-id={`allergens-switcher-${type}`}
                sx={{
                    '.chakra-switch__track': {
                        _checked: {
                            bg: '#b1ff2e',
                        },
                    },
                }}
            />
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    sx={MenuButtonStyle}
                    isDisabled={!sectionAllergens.allergensActive}
                    border={
                        sectionAllergens.allergensActive
                            ? '1px solid #b1ff2e'
                            : '1px solid rgba(0, 0, 0, 0.08)'
                    }
                    data-test-id={`allergens-menu-button-${type}`}
                >
                    {!sectionAllergens.selectedAllergens.length ? (
                        'Выберите из списка...'
                    ) : (
                        <Flex wrap='wrap' gap='4px'>
                            {sectionAllergens.selectedAllergens.map((item) => (
                                <Text
                                    border='1px solid #b1ff2e'
                                    borderRadius='6px'
                                    p='4px 8px'
                                    color='#2db100'
                                    fontSize='12px'
                                    fontWeight={500}
                                    fontFamily='text'
                                >
                                    {item}
                                </Text>
                            ))}
                        </Flex>
                    )}
                </MenuButton>
                <MenuList zIndex={2} w='269px' p='4px 0px' data-test-id='allergens-menu'>
                    {allergensList.map((item, index) => (
                        <MenuItem
                            key={index}
                            closeOnSelect={false}
                            bg={index % 2 === 0 ? 'white' : 'rgba(0, 0, 0, 0.06)'}
                            borderRadius={0}
                        >
                            <Checkbox
                                data-test-id={`allergen-${index}`}
                                isChecked={sectionAllergens.selectedAllergens.includes(item)}
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

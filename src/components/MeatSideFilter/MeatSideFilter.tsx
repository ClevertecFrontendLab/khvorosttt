import { Checkbox, Flex, Text } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { rusName } from '~/data/consts';
import {
    addMeatType,
    addSideDish,
    removeMeatType,
    removeSideDishType,
} from '~/services/features/filtersSlice';
import { selectedFilters } from '~/services/features/selectors';

export interface MeatSideFilterProps {
    type: string;
    title: string;
    items: string[];
}

export function MeatDideFilter({ type, title, items }: MeatSideFilterProps) {
    const { drawer } = useSelector(selectedFilters);
    const dispatch = useDispatch();

    const handleCheckboxChange = (value: string) => {
        if (type === 'meatType') {
            if (drawer.selectedMeatType.includes(value)) {
                dispatch(removeMeatType(value));
            } else {
                dispatch(addMeatType(value));
            }
        } else {
            if (drawer.selectedSideDishType.includes(value)) {
                dispatch(removeSideDishType(value));
            } else {
                dispatch(addSideDish(value));
            }
        }
    };

    return (
        <Flex direction='column'>
            <Text>{title}</Text>
            {items.map((item, index) => (
                <Checkbox
                    data-test-id={item === 'potatoes' ? 'checkbox-картошка' : ''}
                    key={index}
                    isChecked={
                        type === 'meatType'
                            ? drawer.selectedMeatType.includes(item)
                            : drawer.selectedSideDishType.includes(item)
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
                    {rusName(type, item)}
                </Checkbox>
            ))}
        </Flex>
    );
}

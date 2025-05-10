import { Checkbox, Flex, Text } from '@chakra-ui/react';

export interface MeatSideFilterProps {
    title: string;
    items: string[];
    selected: string[];
    handleFunc: (value: string) => void;
}

export function MeatSideFilter({ title, items, selected, handleFunc }: MeatSideFilterProps) {
    return (
        <Flex direction='column'>
            <Text>{title}</Text>
            {items.map((item, index) => (
                <Checkbox
                    data-test-id={item.toLowerCase() === 'картошка' ? 'checkbox-картошка' : ''}
                    key={index}
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
            ))}
        </Flex>
    );
}

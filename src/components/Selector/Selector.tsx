import { ChevronDownIcon } from '@chakra-ui/icons';
import { Button, Checkbox, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export interface SelectorProps {
    type: string;
    placeholder: string;
    items: string[];
    selected: string[];
    handleFunc: (value: string) => void;
}

export function Selector({ type, placeholder, items, selected, handleFunc }: SelectorProps) {
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
                            data-test-id={item === 'vegan' ? 'checkbox-веганская кухня' : ''}
                        >
                            {item}
                        </Checkbox>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    );
}

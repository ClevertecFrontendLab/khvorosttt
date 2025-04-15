import { Accordion, Button, Flex, Text } from '@chakra-ui/react';

import menuCategory from '~/data/menuCategory.json';

import { OutIcon } from '../Icons/Out';
import { NavbarStyle } from './Navbar.style';
import { NavCategory } from './NavCategory/NavCategory';

export function Navbar() {
    return (
        <Flex as='nav' sx={NavbarStyle}>
            <Accordion maxH='872px' overflowY='auto'>
                {menuCategory.map((categoryInfo) => (
                    <NavCategory
                        category={categoryInfo.category}
                        subCategory={categoryInfo.subCategory}
                    />
                ))}
            </Accordion>
            <Flex flexDirection='column' p='0px 24px 32px 24px' gap='15px'>
                <Text fontSize='12px' fontWeight={500} color='rgba(0, 0, 0, 0.24)'>
                    Версия программы 03.25
                </Text>
                <Text
                    fontSize='12px'
                    fontWeight={400}
                    color='rgba(0, 0, 0, 0.64)'
                    whiteSpace='pre-line'
                >
                    Все права защищены,{`\n`} ученический файл,{`\n`} &copy;Клевер Технолоджи, 2025
                </Text>
                <Button
                    leftIcon={<OutIcon />}
                    fontSize='12px'
                    fontWeight={600}
                    color='black'
                    variant='ghost'
                    onClick={() => {}}
                    h='16px'
                    p='0'
                    alignSelf='flex-start'
                >
                    Выход
                </Button>
            </Flex>
        </Flex>
    );
}

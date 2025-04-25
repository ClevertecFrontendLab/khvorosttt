import { Accordion, Flex } from '@chakra-ui/react';

import menuCategory from '~/data/menuCategory.json';

import { NavbarStyle } from './Navbar.style';
import { NavbarFooter } from './NavbarFooter/NavbarFooter';
import { NavCategory } from './NavCategory/NavCategory';

export function Navbar() {
    return (
        <Flex as='nav' sx={NavbarStyle} data-test-id='nav'>
            <Accordion maxH={{ base: '416px', md: '644px' }} overflowY='auto'>
                {menuCategory.map((categoryInfo, index) => (
                    <NavCategory
                        key={index}
                        category={categoryInfo.category}
                        subCategory={categoryInfo.subCategory}
                    />
                ))}
            </Accordion>
            <NavbarFooter />
        </Flex>
    );
}

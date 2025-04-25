import { Box, Collapse, Flex } from '@chakra-ui/react';

import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import { Navbar } from '../Navbar/Navbar';
import { BurgerMenuBGStyle, BurgerMenuStyle } from './BurgerMenu.style';

export interface BurgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

export function BurgerMenu(props: BurgerMenuProps) {
    return props.isOpen ? (
        <Collapse in={props.isOpen} onClick={props.toggleMenu}>
            <Box sx={BurgerMenuBGStyle}>
                <Flex sx={BurgerMenuStyle} onClick={(e) => e.stopPropagation()}>
                    <BreadCrumb />
                    <Navbar />
                </Flex>
            </Box>
        </Collapse>
    ) : null;
}

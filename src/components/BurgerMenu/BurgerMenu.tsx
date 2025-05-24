import { Box, Collapse, Flex } from '@chakra-ui/react';

import { BreadCrumb } from '../BreadCrumb/BreadCrumb';
import { Navbar } from '../Navbar/Navbar';
import { BurgerMenuBGStyle, BurgerMenuStyle } from './BurgerMenu.style';

export interface BurgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

export function BurgerMenu(props: BurgerMenuProps) {
    if (!props.isOpen) return null;

    return (
        <Collapse in={props.isOpen} unmountOnExit>
            <Box sx={BurgerMenuBGStyle} onClick={props.toggleMenu}>
                <Flex sx={BurgerMenuStyle} onClick={(e) => e.stopPropagation()}>
                    <BreadCrumb isOpen={props.isOpen} toggleMenu={props.toggleMenu} />
                    <Navbar />
                </Flex>
            </Box>
        </Collapse>
    );
}

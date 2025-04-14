import { Accordion, Box } from '@chakra-ui/react';

import menuCategory from '~/data/menuCategory.json';

import { NavCategory } from './NavCategory/NavCategory';

export function Navbar() {
    return (
        <Box as='nav' p='90px 0px'>
            <Accordion allowMultiple maxH='872px' overflowY='auto'>
                {menuCategory.map((categoryInfo) => (
                    <NavCategory
                        category={categoryInfo.category}
                        subCategory={categoryInfo.subCategory}
                    />
                ))}
            </Accordion>
        </Box>
    );
}

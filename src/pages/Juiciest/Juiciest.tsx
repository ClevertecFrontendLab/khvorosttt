import { Box, Flex } from '@chakra-ui/react';

import { FoodDisplay } from '~/components/FoodDisplay/FoodDisplay';
import { Search } from '~/components/Search/Search';
import { compareLikes } from '~/data/comparators';
import menuRecipes from '~/data/menuData.json';
import shortInfo from '~/data/vegan.json';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';

export function JuiciestPage() {
    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px'>
                <Search name='Самое сочное' description={null} />
                <FoodDisplay data={menuRecipes.sort(compareLikes).reverse().slice(0, 10)} />
                <CategoryInfo
                    name={shortInfo.name}
                    description={shortInfo.description}
                    data={menuRecipes}
                />
            </Flex>
        </Box>
    );
}

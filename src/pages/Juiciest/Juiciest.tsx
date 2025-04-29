import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { FoodDisplay } from '~/components/FoodDisplay/FoodDisplay';
import { Search } from '~/components/Search/Search';
import { compareLikes } from '~/data/comparators';
import shortInfo from '~/data/vegan.json';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';
import { selectedRecipes } from '~/services/features/selectors';

export function JuiciestPage() {
    const { allRecipe, filteredRecipe } = useSelector(selectedRecipes);
    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px'>
                <Search name='Самое сочное' description={null} />
                <FoodDisplay data={[...filteredRecipe].sort(compareLikes).reverse().slice(0, 10)} />
                <CategoryInfo
                    name={shortInfo.name}
                    description={shortInfo.description}
                    data={[...allRecipe]}
                />
            </Flex>
        </Box>
    );
}

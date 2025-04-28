import { Box, Flex } from '@chakra-ui/react';

import { Search } from '~/components/Search/Search';
import authors from '~/data/authorsPosts.json';
import { compareDate, compareLikes } from '~/data/comparators';
import menuRecipes from '~/data/menuData.json';
import shortInfo from '~/data/vegan.json';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';
import { CookingBlog } from '~/sections/CookingBlog/CookingBlog';
import { Juiciest } from '~/sections/Juiciest/Juiciest';
import { NewRecipes } from '~/sections/NewRecipes/NewRecipes';

export function Home() {
    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px' p='0px 20px'>
                <Search name='Приятного аппетита!' description={null} />
                <NewRecipes data={menuRecipes.sort(compareDate).reverse().slice(0, 10)} />
                <Juiciest
                    title='Самое сочное'
                    data={menuRecipes.sort(compareLikes).reverse().slice(0, 8)}
                />
                <CookingBlog data={authors} />
                <CategoryInfo
                    name={shortInfo.name}
                    description={shortInfo.description}
                    data={menuRecipes}
                />
            </Flex>
        </Box>
    );
}

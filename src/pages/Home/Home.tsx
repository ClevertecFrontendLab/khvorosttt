import { Box, Flex } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

import { Search } from '~/components/Search/Search';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';
import { CookingBlog } from '~/sections/CookingBlog/CookingBlog';
import { Juiciest } from '~/sections/Juiciest/Juiciest';
import { NewRecipes } from '~/sections/NewRecipes/NewRecipes';
import { selectedFilters } from '~/services/features/selectors';

export function Home() {
    const filters = useSelector(selectedFilters);
    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px' p='0px 20px'>
                <Search name='Приятного аппетита!' description={null} />
                {!filters.doFinding ? (
                    <>
                        <NewRecipes />
                        <Juiciest title='Самое сочное' />
                    </>
                ) : null}
                <CookingBlog />
                <CategoryInfo />
            </Flex>
        </Box>
    );
}

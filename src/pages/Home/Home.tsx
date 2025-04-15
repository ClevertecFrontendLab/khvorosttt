import { Box, Flex } from '@chakra-ui/react';

import { Search } from '~/components/Search/Search';
import authors from '~/data/authorsPosts.json';
import juiciest from '~/data/juiciest.json';
import newData from '~/data/new.json';
import shortInfo from '~/data/vegan.json';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';
import { CookingBlog } from '~/sections/CookingBlog/CookingBlog';
import { Juiciest } from '~/sections/Juiciest/Juiciest';
import { NewRecipes } from '~/sections/NewRecipes/NewRecipes';

export function Home() {
    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px'>
                <Search name='Приятного аппетита' description={null} />
                <NewRecipes data={newData} />
                <Juiciest title='Самое сочное' data={juiciest} />
                <CookingBlog data={authors} />
                <CategoryInfo
                    name={shortInfo.name}
                    description={shortInfo.description}
                    data={shortInfo.data}
                />
            </Flex>
        </Box>
    );
}

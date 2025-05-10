import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useGetJuiciestRecipesQuery } from '~/api/recipeApi';
import { FoodDisplay } from '~/components/FoodDisplay/FoodDisplay';
import { Loader } from '~/components/Loader/Loader';
import { Search } from '~/components/Search/Search';
import { recipeI } from '~/interfaces/recipeI';
import { CategoryInfo } from '~/sections/CategoryInfoSection/CategoryInfo';

export function JuiciestPage() {
    const [page, setPage] = useState(1);
    const [allRecipes, setAllRecipes] = useState<recipeI[]>([]);
    const { data, isLoading } = useGetJuiciestRecipesQuery({ limit: 8, page });
    const hasMore = page < (data?.totalPages || 0);

    useEffect(() => {
        if (data && data.recipes) {
            setAllRecipes((prev) => [...prev, ...data.recipes]);
        }
    }, [data]);

    if (isLoading || !data) {
        return <Loader />;
    }

    const loadMore = () => {
        if (hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <Box w='100%' p='90px 0px'>
            <Flex flexDirection='column' gap='40px'>
                <Search name='Самое сочное' description={null} />
                <FoodDisplay
                    data={allRecipes}
                    loadMore={loadMore}
                    hasMore={hasMore}
                    isLoading={isLoading}
                />
                <CategoryInfo />
            </Flex>
        </Box>
    );
}

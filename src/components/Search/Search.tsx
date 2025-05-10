import { Text, VStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { useGetRecipeWithSearchQuery } from '~/api/recipeApi';
import { selectedFilters } from '~/services/features/selectors';

import { FoodDisplay } from '../FoodDisplay/FoodDisplay';
import { SearchDescriptionStyle, SearchHeaderStyle } from './Search.style';
import { SearchDetails } from './SearchDetails';

interface SearchProps {
    name: string;
    description: string | null;
}

export function Search({ name, description }: SearchProps) {
    const filters = useSelector(selectedFilters);

    const shouldSearch = useMemo(() => {
        const {
            searchQuery,
            selectedAuthors,
            selectedCategories,
            selectedMeatType,
            selectedSideDishType,
        } = filters;

        const hasRealFilters =
            searchQuery.trim().length >= 3 ||
            selectedAuthors.length > 0 ||
            selectedCategories.length > 0 ||
            selectedMeatType.length > 0 ||
            selectedSideDishType.length > 0;
        return hasRealFilters;
    }, [filters]);

    const { data: findedRecipe, isLoading } = useGetRecipeWithSearchQuery(
        {
            limit: 8,
            page: 1,
            ids: filters.selectedCategories,
            meat: filters.selectedMeatType,
            allergens: filters.selectedAllergens,
            searchString: filters.searchQuery,
            garnish: filters.selectedSideDishType,
        },
        { skip: !shouldSearch },
    );

    return (
        <VStack gap={{ base: '16px', lg: '32px' }}>
            <VStack gap={{ base: '16px', lg: '12px' }}>
                <Text as='h2' sx={SearchHeaderStyle}>
                    {name}
                </Text>
                {description && !isLoading && (
                    <Text sx={SearchDescriptionStyle} align='center'>
                        {description}
                    </Text>
                )}
            </VStack>

            <SearchDetails isLoading={isLoading} shouldSearch={shouldSearch} />

            {filters.doFinding && (
                <FoodDisplay
                    data={findedRecipe?.recipes ?? []}
                    loadMore={() => {}}
                    hasMore={false}
                    isLoading={isLoading}
                />
            )}
        </VStack>
    );
}

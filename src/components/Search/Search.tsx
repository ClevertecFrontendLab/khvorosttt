import { Hide, Text, VStack } from '@chakra-ui/react';
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
    const {
        searchQuery,
        selectedAuthors,
        selectedCategories,
        selectedMeatType,
        selectedSideDishType,
    } = filters;

    const shouldSearch = useMemo(() => {
        const hasRealFilters =
            searchQuery.trim().length >= 3 ||
            selectedAuthors.length > 0 ||
            selectedCategories.length > 0 ||
            selectedMeatType.length > 0 ||
            selectedSideDishType.length > 0;

        return hasRealFilters;
    }, [
        searchQuery,
        selectedAuthors.length,
        selectedCategories.length,
        selectedMeatType.length,
        selectedSideDishType.length,
    ]);

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
        { skip: !(shouldSearch || filters.doFinding) },
    );

    return (
        <VStack gap={{ base: '16px', lg: '32px' }}>
            <VStack
                gap={{ base: '16px', lg: '32px' }}
                borderRadius='24px'
                boxShadow='0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                w={{ base: 'fit-content', ms: '600px', '2xl': '898px' }}
                h={{ base: 'fit-content' }}
                p='20px 10px'
            >
                <VStack gap={{ base: '16px', lg: '12px' }}>
                    <Text as='h2' sx={SearchHeaderStyle}>
                        {name}
                    </Text>
                    <Hide below='xl'>
                        {description && !isLoading && (
                            <Text sx={SearchDescriptionStyle} align='center'>
                                {description}
                            </Text>
                        )}
                    </Hide>
                </VStack>
                <SearchDetails isLoading={isLoading} shouldSearch={shouldSearch} />
            </VStack>

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

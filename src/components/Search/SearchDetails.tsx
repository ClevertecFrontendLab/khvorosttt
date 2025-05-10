import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    Hide,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    addAllergen,
    cleanAllergen,
    removeAllergen,
    setFinding,
    setSearchQuery,
    toggleAllergensActive,
} from '~/services/features/filtersSlice';
import { selectedFilters } from '~/services/features/selectors';

import { Allergens } from '../Allergens/Allergens';
import { Filter } from '../Filter/Filter';
import { FilterTagPanel } from '../FilterTagPanel/FilterTagPanel';
import { SearchIcon2 } from '../Icons/SearchIcon';
import { SearchLoader } from '../SearchLoader/SearchLoader';
import { IconButtonStyle } from './Search.style';

export function SearchDetails({
    isLoading,
    shouldSearch,
}: {
    isLoading: boolean;
    shouldSearch: boolean;
}) {
    const dispatch = useDispatch();
    const filters = useSelector(selectedFilters);
    const [search, setSearch] = useState(filters.searchQuery);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        dispatch(setFinding(shouldSearch));
    }, [shouldSearch, dispatch]);

    const handleSearch = () => {
        const query = search.trim().toLowerCase();
        if (query.length >= 3) {
            dispatch(setSearchQuery(query));
        }
    };

    const changeAllergenSelector = (item: string) => {
        if (filters.selectedAllergens.includes(item)) {
            dispatch(removeAllergen(item));
        } else {
            dispatch(addAllergen(item));
        }
    };

    if (isLoading) {
        return <SearchLoader />;
    }

    return (
        <VStack gap='16px' maxW={{ base: '328px', md: 'none' }}>
            <Flex gap='15px'>
                <IconButton
                    icon={<SearchIcon2 />}
                    aria-label='search'
                    sx={IconButtonStyle}
                    data-test-id='filter-button'
                    onClick={() => {
                        onOpen();
                        dispatch(cleanAllergen());
                    }}
                />
                <InputGroup w={{ ms: '458px', base: '284px' }}>
                    <InputRightElement
                        pointerEvents={
                            search.trim().length >= 3 || filters.selectedAllergens.length > 0
                                ? 'auto'
                                : 'none'
                        }
                        data-test-id='search-button'
                        cursor={search.trim().length >= 3 && !isLoading ? 'pointer' : 'default'}
                        onClick={handleSearch}
                    >
                        <SearchIcon color='black' />
                    </InputRightElement>
                    <Input
                        type='text'
                        placeholder='Название или ингредиент...'
                        _placeholder={{
                            color: '#134b00',
                            fontWeight: 400,
                            fontSize: { md: '18px', lg: '14px' },
                        }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && search.trim().length >= 3 && !isLoading) {
                                handleSearch();
                            }
                        }}
                        data-test-id='search-input'
                    />
                </InputGroup>
            </Flex>

            <Hide below='lg'>
                {!isOpen && (
                    <Allergens
                        type=''
                        handleFunc={changeAllergenSelector}
                        selected={filters.selectedAllergens}
                        isActive={filters.allergensActive}
                        setActive={() => dispatch(toggleAllergensActive(!filters.allergensActive))}
                    />
                )}
            </Hide>

            <FilterTagPanel
                category={filters.selectedCategories}
                authors={filters.selectedAuthors}
                meatType={filters.selectedMeatType}
                sideDishType={filters.selectedSideDishType}
            />
            <Filter isOpen={isOpen} onClose={onClose} />
        </VStack>
    );
}

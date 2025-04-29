import { SearchIcon } from '@chakra-ui/icons';
import {
    Flex,
    Hide,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cleanDrawer, setSearchQuery } from '~/services/features/filtersSlice';
import { applyFilters } from '~/services/features/recipeSlice';
import { selectedFilters } from '~/services/features/selectors';

import { Allergens } from '../Allergens/Allergens';
import { useCategoryContext } from '../CategoryContext/CategoryContext';
import { Filter } from '../Filter/Filter';
import { SearchIcon2 } from '../Icons/SearchIcon';
import { IconButtonStyle, SearchDescriptionStyle, SearchHeaderStyle } from './Search.style';

interface SearchProps {
    name: string;
    description: string | null;
}

export function Search(data: SearchProps) {
    const dispatch = useDispatch();
    const filters = useSelector(selectedFilters);

    const handleSearch = () => {
        const lowercasedSearch = searchQuery.trim().toLowerCase();
        dispatch(setSearchQuery(lowercasedSearch));
    };
    const { searchQuery } = filters;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { category, subcategory } = useCategoryContext();

    useEffect(() => {
        dispatch(applyFilters({ category, subcategory, filters }));
    }, [filters.sectionAllergens, filters.searchQuery, dispatch]);
    return (
        <VStack gap={{ base: '16px', lg: '32px' }}>
            <VStack gap={{ base: '16px', lg: '12px' }}>
                <Text as='h2' sx={SearchHeaderStyle}>
                    {data.name}
                </Text>
                {data.description! ? (
                    <Text sx={SearchDescriptionStyle} align='center'>
                        {data.description}
                    </Text>
                ) : null}
            </VStack>
            <VStack gap='16px' maxW={{ base: '328px', md: 'none' }}>
                <Flex gap='15px'>
                    <IconButton
                        icon={<SearchIcon2 />}
                        aria-label='search'
                        sx={IconButtonStyle}
                        data-test-id='filter-button'
                        onClick={() => {
                            onOpen();
                            dispatch(cleanDrawer());
                        }}
                    />
                    <InputGroup w={{ ms: '458px', base: '284px' }}>
                        <InputRightElement
                            pointerEvents={searchQuery.trim().length >= 3 ? 'auto' : 'none'}
                            data-test-id='search-button'
                            cursor={searchQuery.trim().length >= 3 ? 'pointer' : 'default'}
                            onClick={() => {
                                if (searchQuery.trim().length >= 3) {
                                    handleSearch();
                                }
                            }}
                        >
                            <SearchIcon color='black' />
                        </InputRightElement>
                        <Input
                            type='text'
                            _placeholder={{
                                color: '#134b00',
                                fontWeight: 400,
                                fontSize: { md: '18px', lg: '14px' },
                            }}
                            placeholder='Название или ингредиент...'
                            value={searchQuery}
                            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && searchQuery.trim().length >= 3) {
                                    handleSearch();
                                }
                            }}
                            data-test-id='search-input'
                        />
                    </InputGroup>
                </Flex>
                <Hide below='lg'>{!isOpen && <Allergens type='' />}</Hide>
                <Filter isOpen={isOpen} onClose={onClose} />
            </VStack>
        </VStack>
    );
}

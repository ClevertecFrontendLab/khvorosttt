import { Flex } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';

import {
    removeAllergen,
    removeAuthor,
    removeCategories,
    removeMeatType,
    removeSideDishType,
} from '~/services/features/filtersSlice';

import { FilterTags } from '../FilterTags/FilterTags';

export interface FilterTagPanelProps {
    type?: string;
    category: string[];
    authors: string[];
    meatType: string[];
    sideDishType: string[];
    allergens?: string[];
    handleRemoveTag?: (filterType: string, tag: string) => void;
}

export function FilterTagPanel({
    type,
    category,
    authors,
    meatType,
    sideDishType,
    allergens,
    handleRemoveTag,
}: FilterTagPanelProps) {
    const dispatch = useDispatch();

    const handleRemoveTagSearch = (filterType: string, item: string) => {
        switch (filterType) {
            case 'category':
                dispatch(removeCategories(item));
                break;
            case 'author':
                dispatch(removeAuthor(item));
                break;
            case 'meatType':
                dispatch(removeMeatType(item));
                break;
            case 'sideDishType':
                dispatch(removeSideDishType(item));
                break;
            case 'allergens':
                dispatch(removeAllergen(item));
                break;
        }
    };

    return (
        <Flex w='100%' wrap='wrap'>
            <FilterTags
                filterType='category'
                items={category}
                handleRemoveTag={type === 'filter' ? handleRemoveTag! : handleRemoveTagSearch}
            />
            <FilterTags
                filterType='author'
                items={authors}
                handleRemoveTag={type === 'filter' ? handleRemoveTag! : handleRemoveTagSearch}
            />
            <FilterTags
                filterType='meatType'
                items={meatType}
                handleRemoveTag={type === 'filter' ? handleRemoveTag! : handleRemoveTagSearch}
            />
            <FilterTags
                filterType='sideDishType'
                items={sideDishType}
                handleRemoveTag={type === 'filter' ? handleRemoveTag! : handleRemoveTagSearch}
            />
            {type === 'filter' ? (
                <FilterTags
                    filterType='allergens'
                    items={allergens ? allergens : []}
                    handleRemoveTag={type === 'filter' ? handleRemoveTag! : handleRemoveTagSearch}
                />
            ) : null}
        </Flex>
    );
}

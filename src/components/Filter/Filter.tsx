import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { meatTypeArray, sideDishTypeArray } from '~/data/consts';
import menuCategory from '~/data/menuCategory.json';
import {
    cleanDrawer,
    removeAuthor,
    removeCategories,
    removeDrawerAllergen,
    removeMeatType,
    removeSideDishType,
} from '~/services/features/filtersSlice';
import { applyFilters } from '~/services/features/recipeSlice';
import { selectedFilters } from '~/services/features/selectors';

import { Allergens } from '../Allergens/Allergens';
import { FilterTags } from '../FilterTags/FilterTags';
import { MeatDideFilter } from '../MeatSideFilter/MeatSideFilter';
import { Selector } from '../Selector/Selector';

interface FilterProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Filter({ isOpen, onClose }: FilterProps) {
    const dispatch = useDispatch();
    const { drawer } = useSelector(selectedFilters);
    const filters = useSelector(selectedFilters);

    const handleRemoveTag = (filterType: string, item: string) => {
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
                dispatch(removeDrawerAllergen(item));
                break;
        }
    };

    return (
        <>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent
                    minW={{ base: '308px', '2xl': '463px' }}
                    p={{ base: '24px 16px', '2xl': '32px' }}
                    data-test-id='filter-drawer'
                    overflowX='hidden'
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'rgba(0, 0, 0, 0.04)',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: 'rgba(0, 0, 0, 0.16)',
                            borderRadius: '8px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: 'rgba(0, 0, 0, 0.2)',
                        },
                        '&::-webkit-scrollbar-button': {
                            display: 'none',
                            height: 0,
                            width: 0,
                        },
                    }}
                >
                    <DrawerCloseButton
                        borderRadius='50px'
                        bg='black'
                        h='24px'
                        w='24px'
                        color='white'
                        data-test-id='close-filter-drawer'
                        onClick={() => cleanDrawer()}
                    />
                    <DrawerHeader fontWeight={700} fontSize='24px' fontFamily='text'>
                        Фильтр
                    </DrawerHeader>

                    <DrawerBody
                        p='0px'
                        gap={{ base: '12px', xl: '24px' }}
                        display='flex'
                        flexDirection='column'
                    >
                        <Selector
                            placeholder='Категория'
                            type='category'
                            items={[...menuCategory.map((item) => item.category)]}
                        />
                        <Selector placeholder='Поиск по автору' type='author' items={[]} />
                        <MeatDideFilter type='meatType' title='Тип мяса:' items={meatTypeArray} />
                        <MeatDideFilter
                            type='sideDishType'
                            title='Тип гарнира:'
                            items={sideDishTypeArray}
                        />

                        <Allergens type='filter' />
                        <Flex w='100%' wrap='wrap'>
                            <FilterTags
                                filterType='category'
                                items={drawer.selectedCategories}
                                handleRemoveTag={handleRemoveTag}
                            />
                            <FilterTags
                                filterType='author'
                                items={drawer.selectedAuthors}
                                handleRemoveTag={handleRemoveTag}
                            />
                            <FilterTags
                                filterType='meatType'
                                items={drawer.selectedMeatType}
                                handleRemoveTag={handleRemoveTag}
                            />
                            <FilterTags
                                filterType='sideDishType'
                                items={drawer.selectedSideDishType}
                                handleRemoveTag={handleRemoveTag}
                            />
                            <FilterTags
                                filterType='allergens'
                                items={drawer.selectedAllergens}
                                handleRemoveTag={handleRemoveTag}
                            />
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter p='5px'>
                        <Button
                            variant='outline'
                            mr={3}
                            onClick={() => {
                                dispatch(cleanDrawer());
                            }}
                            w={{ base: '146px', '2xl': '205px' }}
                            p={{ base: '0px 12px', '2xl': '0px 24px' }}
                            fontWeight={600}
                            fontSize={{ base: '14px', '2xl': '18px' }}
                            fontFamily='text'
                            data-test-id='clear-filter-button'
                        >
                            Очистить фильтр
                        </Button>
                        <Button
                            bg='black'
                            color='white'
                            w={{ base: '146px', '2xl': '205px' }}
                            p={{ base: '0px 12px', '2xl': '0px 24px' }}
                            fontWeight={600}
                            fontSize={{ base: '14px', '2xl': '18px' }}
                            fontFamily='text'
                            data-test-id='find-recipe-button'
                            sx={{
                                pointerEvents:
                                    drawer.selectedAllergens.length ||
                                    drawer.selectedSideDishType.length ||
                                    drawer.selectedAuthors.length ||
                                    drawer.selectedCategories.length ||
                                    drawer.selectedMeatType.length
                                        ? 'auto'
                                        : 'none',
                            }}
                            onClick={() => {
                                dispatch(applyFilters({ filters }));
                                onClose();
                            }}
                        >
                            Найти рецепт
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

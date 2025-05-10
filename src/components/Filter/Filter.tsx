import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { meatTypeArrayRus, sideDishTypeArrayRus } from '~/data/consts';
import menuCategory from '~/data/menuCategory.json';
import {
    cleanAllergen,
    setAllergen,
    setAuthors,
    setCategories,
    setMeatType,
    setSideDish,
    toggleAllergensActive,
} from '~/services/features/filtersSlice';

import { Allergens } from '../Allergens/Allergens';
import { FilterTagPanel } from '../FilterTagPanel/FilterTagPanel';
import { MeatSideFilter } from '../MeatSideFilter/MeatSideFilter';
import { Selector } from '../Selector/Selector';

interface FilterProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Filter({ isOpen, onClose }: FilterProps) {
    const dispatch = useDispatch();
    const [categoryTempArray, setCategoryTempArray] = useState<string[]>([]);
    const [authorsTempArray, setAuthorsTempArray] = useState<string[]>([]);
    const [meatTypeTempArray, setMeatTempArray] = useState<string[]>([]);
    const [sideDishTempArray, setSideDishTempArray] = useState<string[]>([]);
    const [allergensTempArray, setAllergensTempArray] = useState<string[]>([]);
    const [isActive, setActive] = useState<boolean>(false);

    const handleRemoveTag = (filterType: string, item: string) => {
        switch (filterType) {
            case 'category':
                setCategoryTempArray((arr) => arr.filter((a) => a !== item));
                break;
            case 'author':
                setAuthorsTempArray((arr) => arr.filter((a) => a !== item));
                break;
            case 'meatType':
                setMeatTempArray((arr) => arr.filter((a) => a !== item));
                break;
            case 'sideDishType':
                setSideDishTempArray((arr) => arr.filter((a) => a !== item));
                break;
            case 'allergens':
                setAllergensTempArray((arr) => arr.filter((a) => a !== item));
                break;
        }
    };

    const changeCategorySelector = (item: string) => {
        if (categoryTempArray.includes(item)) {
            setCategoryTempArray((arr) => arr.filter((a) => a !== item));
        } else {
            setCategoryTempArray((arr) => [...arr, item]);
        }
    };

    const changeAuthorsSelector = (item: string) => {
        if (authorsTempArray.includes(item)) {
            setAuthorsTempArray((arr) => arr.filter((a) => a !== item));
        } else {
            setAuthorsTempArray((arr) => [...arr, item]);
        }
    };

    const changeMeatSelector = (item: string) => {
        if (meatTypeTempArray.includes(item)) {
            setMeatTempArray((arr) => arr.filter((a) => a !== item));
        } else {
            setMeatTempArray((arr) => [...arr, item]);
        }
    };

    const changeSideDishSelector = (item: string) => {
        if (sideDishTempArray.includes(item)) {
            setSideDishTempArray((arr) => arr.filter((a) => a !== item));
        } else {
            setSideDishTempArray((arr) => [...arr, item]);
        }
    };

    const changeAllergenSelector = (item: string) => {
        if (allergensTempArray.includes(item)) {
            setAllergensTempArray((arr) => arr.filter((a) => a !== item));
        } else {
            setAllergensTempArray((arr) => [...arr, item]);
        }
    };

    const handleActive = () => {
        setActive((a) => !a);
    };

    const cleanTempArrays = () => {
        toggleAllergensActive(false);
        setAllergensTempArray([]);
        setMeatTempArray([]);
        setAuthorsTempArray([]);
        setCategoryTempArray([]);
        setSideDishTempArray([]);
    };

    const setFilters = () => {
        dispatch(toggleAllergensActive(isActive));
        dispatch(setCategories(categoryTempArray));
        dispatch(setAuthors(authorsTempArray));
        dispatch(setMeatType(meatTypeTempArray));
        dispatch(setSideDish(sideDishTempArray));
        dispatch(setAllergen(allergensTempArray));
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
                        onClick={() => cleanAllergen()}
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
                            selected={categoryTempArray}
                            handleFunc={changeCategorySelector}
                        />
                        <Selector
                            placeholder='Поиск по автору'
                            type='author'
                            items={[]}
                            selected={authorsTempArray}
                            handleFunc={changeAuthorsSelector}
                        />
                        <MeatSideFilter
                            title='Тип мяса:'
                            items={meatTypeArrayRus}
                            selected={meatTypeTempArray}
                            handleFunc={changeMeatSelector}
                        />
                        <MeatSideFilter
                            title='Тип гарнира:'
                            items={sideDishTypeArrayRus}
                            selected={sideDishTempArray}
                            handleFunc={changeSideDishSelector}
                        />

                        <Allergens
                            type='filter'
                            handleFunc={changeAllergenSelector}
                            selected={allergensTempArray}
                            isActive={isActive}
                            setActive={handleActive}
                        />
                        <FilterTagPanel
                            type='filter'
                            category={categoryTempArray}
                            authors={authorsTempArray}
                            meatType={meatTypeTempArray}
                            sideDishType={sideDishTempArray}
                            allergens={allergensTempArray}
                            handleRemoveTag={handleRemoveTag}
                        />
                    </DrawerBody>

                    <DrawerFooter p='5px'>
                        <Button
                            variant='outline'
                            mr={3}
                            onClick={cleanTempArrays}
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
                                    allergensTempArray.length ||
                                    sideDishTempArray.length ||
                                    authorsTempArray.length ||
                                    categoryTempArray.length ||
                                    meatTypeTempArray.length
                                        ? 'auto'
                                        : 'none',
                            }}
                            onClick={() => {
                                setFilters();
                                cleanTempArrays();
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

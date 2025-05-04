import { Accordion, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGetCategoryQuery } from '~/api/categoryApi';
import { categoryI } from '~/interfaces/categoryI';
import { setCategories } from '~/services/features/categoriesSlice';
import { selectedCategories } from '~/services/features/selectors';

import { Loader } from '../Loader/Loader';
import { NavbarStyle } from './Navbar.style';
import { NavbarFooter } from './NavbarFooter/NavbarFooter';
import { NavCategory } from './NavCategory/NavCategory';

export function Navbar() {
    const dispatch = useDispatch();
    const categoriesSavedData = useSelector(selectedCategories);
    const { data: categories, isLoading, isError } = useGetCategoryQuery();

    useEffect(() => {
        if (!categoriesSavedData && categories) {
            dispatch(setCategories(categories));
        }
    }, [categories, categoriesSavedData, dispatch]);

    if (isLoading) {
        return <Loader />;
    }

    let dataToDisplay: categoryI[] | undefined = categories;

    if (isError || !dataToDisplay) {
        dataToDisplay = categoriesSavedData.categories;
    }

    return (
        <Flex as='nav' sx={NavbarStyle} data-test-id='nav'>
            <Accordion maxH={{ base: '416px', md: '644px' }} overflowY='auto'>
                {dataToDisplay.map((categoryInfo, index) => (
                    <NavCategory
                        key={index}
                        category={categoryInfo}
                        subCategory={categoryInfo.subCategories}
                    />
                ))}
            </Accordion>
            <NavbarFooter />
        </Flex>
    );
}

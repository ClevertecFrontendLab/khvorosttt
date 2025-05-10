import { ReactNode, useState } from 'react';
import { useSelector } from 'react-redux';

import { categoryI, subCategoryI } from '~/interfaces/categoryI';
import { selectedCategories } from '~/services/features/selectors';

import { CategoryContext } from './CategoryContext';

interface CategoryContextProviderProps {
    children: ReactNode;
}

export function CategoryContextProvider({ children }: CategoryContextProviderProps) {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState<string | undefined>('');
    const [tabIndex, setTabIndex] = useState<number>(0);
    const categoriesSavedData = useSelector(selectedCategories);

    const selectCategory = (categoryId: string) => {
        setCategory(categoryId);
        const selectedCategory: categoryI | undefined = categoriesSavedData.categories.find(
            (item: categoryI) => item._id === categoryId,
        );
        setSubcategory(selectedCategory ? selectedCategory.subCategories[0]._id : '');
        setTabIndex(0);
    };

    const selectSubcategory = (subcategoryId: string) => {
        setSubcategory(subcategoryId);
        const selectedSubcategory: subCategoryI | undefined =
            categoriesSavedData.subcategories.find(
                (item: subCategoryI) => item._id === subcategoryId,
            );
        const selectedCategory: categoryI | undefined = categoriesSavedData.categories.find(
            (item: categoryI) => item._id === selectedSubcategory?.rootCategoryId,
        );
        const selectedIndex: number | undefined = selectedCategory?.subCategories.findIndex(
            (item: subCategoryI) => item._id === subcategoryId,
        );
        setTabIndex(selectedIndex || 0);
    };

    return (
        <CategoryContext.Provider
            value={{ category, selectCategory, subcategory, selectSubcategory, tabIndex }}
        >
            {children}
        </CategoryContext.Provider>
    );
}

import { ReactNode, useState } from 'react';

import menuCategory from '~/data/menuCategory.json';

import { CategoryContext } from './CategoryContext';

interface CategoryContextProviderProps {
    children: ReactNode;
}

export function CategoryContextProvider({ children }: CategoryContextProviderProps) {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState<string | undefined>('');
    const [tabIndex, setTabIndex] = useState<number>(0);

    const selectCategory = (category: string) => {
        setCategory(category);
        const select = menuCategory.find((item) => item.category === category);
        setSubcategory(select?.subCategory[0]);
        setTabIndex(0);
    };

    const selectSubcategory = (subcategory: string) => {
        const selectedCategory = menuCategory.find((item) => item.category === category);
        const index = selectedCategory?.subCategory.findIndex((item) => item === subcategory);
        setSubcategory(subcategory);
        setTabIndex(index!);
    };

    return (
        <CategoryContext.Provider
            value={{ category, selectCategory, subcategory, selectSubcategory, tabIndex }}
        >
            {children}
        </CategoryContext.Provider>
    );
}

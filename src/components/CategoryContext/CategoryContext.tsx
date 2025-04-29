import { createContext, useContext } from 'react';

export type categoryContextType = {
    category: string | undefined;
    selectCategory: (categoty: string) => void;
    subcategory: string | undefined;
    selectSubcategory: (categoty: string) => void;
    tabIndex: number;
};

export const CategoryContext = createContext<categoryContextType | undefined>(undefined);

export const useCategoryContext = () => {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error('You try use undefined context');
    }
    return context;
};

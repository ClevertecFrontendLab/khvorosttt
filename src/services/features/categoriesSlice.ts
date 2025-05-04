import { createSlice } from '@reduxjs/toolkit';

import { categoryI, subCategoryI } from '~/interfaces/categoryI';

export interface CategoriesStateI {
    categories: categoryI[];
    subcategories: subCategoryI[];
}

const initialCategoryState: CategoriesStateI = {
    categories: [],
    subcategories: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialCategoryState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setSubcategories: (state, action) => {
            state.subcategories = action.payload;
        },
    },
});

export const { setCategories, setSubcategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

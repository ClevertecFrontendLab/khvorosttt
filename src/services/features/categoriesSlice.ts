import { createSlice } from '@reduxjs/toolkit';

import { categoryI } from '~/interfaces/categoryI';

export interface CategoriesStateI {
    categories: categoryI[];
}

const initialCategoryState: CategoriesStateI = {
    categories: [],
};

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: initialCategoryState,
    reducers: {
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export interface FiltersStateI {
    searchQuery: string;
    allergensActive: boolean;
    selectedAllergens: string[];
    selectedAuthors: string[];
    selectedCategories: string[];
    selectedMeatType: string[];
    selectedSideDishType: string[];
    doFinding: boolean;
}

const initialFilterState: FiltersStateI = {
    searchQuery: '',
    allergensActive: false,
    selectedAllergens: [],
    selectedCategories: [],
    selectedAuthors: [],
    selectedMeatType: [],
    selectedSideDishType: [],
    doFinding: false,
};

export const filtersSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        toggleAllergensActive: (state, action) => {
            state.allergensActive = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        cleanSearchQuery: (state) => {
            state.searchQuery = '';
        },
        cleanAllergen: (state) => {
            state.allergensActive = false;
            state.selectedAllergens = [];
            state.selectedAuthors = [];
            state.selectedCategories = [];
            state.selectedMeatType = [];
            state.selectedSideDishType = [];
        },
        removeAllergen: (state, action) => {
            state.selectedAllergens = state.selectedAllergens.filter(
                (item) => item !== action.payload,
            );
        },
        removeAuthor: (state, action) => {
            state.selectedAuthors = state.selectedAuthors.filter((item) => item !== action.payload);
        },
        removeCategories: (state, action) => {
            state.selectedCategories = state.selectedCategories.filter(
                (item) => item !== action.payload,
            );
        },
        removeMeatType: (state, action) => {
            state.selectedMeatType = state.selectedMeatType.filter(
                (item) => item !== action.payload,
            );
        },
        removeSideDishType: (state, action) => {
            state.selectedSideDishType = state.selectedSideDishType.filter(
                (item) => item !== action.payload,
            );
        },
        addAllergen: (state, action) => {
            if (!state.selectedAllergens.includes(action.payload)) {
                state.selectedAllergens.push(action.payload);
            }
        },
        setAllergen: (state, action) => {
            state.selectedAllergens = [...action.payload];
        },
        addAuthor: (state, action) => {
            if (!state.selectedAuthors.includes(action.payload)) {
                state.selectedAuthors.push(action.payload);
            }
        },
        setAuthors: (state, action) => {
            state.selectedAuthors = [...action.payload];
        },
        addCategories: (state, action) => {
            if (!state.selectedCategories.includes(action.payload)) {
                state.selectedCategories.push(action.payload);
            }
        },
        setCategories: (state, action) => {
            state.selectedCategories = [...action.payload];
        },
        addMeatType: (state, action) => {
            if (!state.selectedMeatType.includes(action.payload)) {
                state.selectedMeatType.push(action.payload);
            }
        },
        setMeatType: (state, action) => {
            state.selectedMeatType = [...action.payload];
        },
        addSideDish: (state, action) => {
            if (!state.selectedSideDishType.includes(action.payload)) {
                state.selectedSideDishType.push(action.payload);
            }
        },
        setSideDish: (state, action) => {
            state.selectedSideDishType = [...action.payload];
        },
        setFinding: (state, action) => {
            state.doFinding = action.payload;
        },
    },
});

export const {
    setSearchQuery,
    cleanSearchQuery,
    cleanAllergen,
    removeAuthor,
    removeCategories,
    removeMeatType,
    removeSideDishType,
    toggleAllergensActive,
    addAuthor,
    addCategories,
    addAllergen,
    addMeatType,
    addSideDish,
    removeAllergen,
    setAllergen,
    setAuthors,
    setCategories,
    setMeatType,
    setSideDish,
    setFinding,
} = filtersSlice.actions;

export default filtersSlice.reducer;

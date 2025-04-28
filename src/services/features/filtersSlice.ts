import { createSlice } from '@reduxjs/toolkit';

export interface FiltersStateI {
    searchQuery: string;
    drawer: {
        allergensActive: boolean;
        selectedAllergens: string[];
        selectedAuthors: string[];
        selectedCategories: string[];
        selectedMeatType: string[];
        selectedSideDishType: string[];
    };
    sectionAllergens: {
        allergensActive: boolean;
        selectedAllergens: string[];
    };
}

const initialFilterState: FiltersStateI = {
    searchQuery: '',
    drawer: {
        allergensActive: false,
        selectedAllergens: [],
        selectedCategories: [],
        selectedAuthors: [],
        selectedMeatType: [],
        selectedSideDishType: [],
    },
    sectionAllergens: {
        allergensActive: false,
        selectedAllergens: [],
    },
};

export const filtersSlice = createSlice({
    name: 'filter',
    initialState: initialFilterState,
    reducers: {
        toggleSectionAllergensActive: (state, action) => {
            state.sectionAllergens.allergensActive = action.payload;
        },
        toggleDrawerAllergensActive: (state, action) => {
            state.drawer.allergensActive = action.payload;
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        cleanSearchQuery: (state) => {
            state.searchQuery = '';
        },
        cleanDrawer: (state) => {
            state.drawer.allergensActive = false;
            state.drawer.selectedAllergens = [];
            state.drawer.selectedAuthors = [];
            state.drawer.selectedCategories = [];
            state.drawer.selectedMeatType = [];
            state.drawer.selectedSideDishType = [];
        },
        cleanSectionAllergen: (state) => {
            state.sectionAllergens.selectedAllergens = [];
        },
        removeSectionAllergen: (state, action) => {
            state.sectionAllergens.selectedAllergens =
                state.sectionAllergens.selectedAllergens.filter((item) => item !== action.payload);
        },
        removeDrawerAllergen: (state, action) => {
            state.drawer.selectedAllergens = state.drawer.selectedAllergens.filter(
                (item) => item !== action.payload,
            );
        },
        removeAuthor: (state, action) => {
            state.drawer.selectedAuthors = state.drawer.selectedAuthors.filter(
                (item) => item !== action.payload,
            );
        },
        removeCategories: (state, action) => {
            state.drawer.selectedCategories = state.drawer.selectedCategories.filter(
                (item) => item !== action.payload,
            );
        },
        removeMeatType: (state, action) => {
            state.drawer.selectedMeatType = state.drawer.selectedMeatType.filter(
                (item) => item !== action.payload,
            );
        },
        removeSideDishType: (state, action) => {
            state.drawer.selectedSideDishType = state.drawer.selectedSideDishType.filter(
                (item) => item !== action.payload,
            );
        },
        addSectionAllergen: (state, action) => {
            if (!state.sectionAllergens.selectedAllergens.includes(action.payload)) {
                state.sectionAllergens.selectedAllergens.push(action.payload);
            }
        },
        addDrawerAllergen: (state, action) => {
            if (!state.drawer.selectedAllergens.includes(action.payload)) {
                state.drawer.selectedAllergens.push(action.payload);
            }
        },
        addAuthor: (state, action) => {
            if (!state.drawer.selectedAuthors.includes(action.payload)) {
                state.drawer.selectedAuthors.push(action.payload);
            }
        },
        addCategories: (state, action) => {
            if (!state.drawer.selectedCategories.includes(action.payload)) {
                state.drawer.selectedCategories.push(action.payload);
            }
        },
    },
});

export const {
    setSearchQuery,
    cleanSearchQuery,
    cleanDrawer,
    removeSectionAllergen,
    removeDrawerAllergen,
    removeAuthor,
    removeCategories,
    removeMeatType,
    removeSideDishType,
    toggleDrawerAllergensActive,
    toggleSectionAllergensActive,
    addAuthor,
    addCategories,
    addDrawerAllergen,
    addSectionAllergen,
    cleanSectionAllergen,
} = filtersSlice.actions;

export default filtersSlice.reducer;

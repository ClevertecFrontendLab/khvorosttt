import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { russianAllergens } from '~/data/consts';
import { recipeI } from '~/data/interface/data';
import menuRecipes from '~/data/menuData.json';

import { FiltersStateI } from './filtersSlice';

export interface RecipeStateI {
    allRecipe: recipeI[];
    filteredRecipe: recipeI[];
}

const initialRecipeState: RecipeStateI = {
    allRecipe: menuRecipes,
    filteredRecipe: menuRecipes,
};

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: initialRecipeState,
    reducers: {
        applyFilters(
            state,
            action: PayloadAction<{
                filters: FiltersStateI;
                category?: string;
                subcategory?: string;
            }>,
        ) {
            const { category, subcategory, filters } = action.payload;
            const query = filters.searchQuery.trim().toLowerCase();

            let result = [...state.allRecipe];

            if (category) {
                result = result.filter((recipe) => recipe.category.includes(category));
            }

            if (subcategory) {
                result = result.filter((recipe) => recipe.subcategory.includes(subcategory));
            }

            if (filters.sectionAllergens.allergensActive) {
                if (filters.sectionAllergens.selectedAllergens.length) {
                    const allergens = filters.sectionAllergens.selectedAllergens.map((a: string) =>
                        a.toLowerCase(),
                    );
                    result = result.filter(
                        (recipe) =>
                            !recipe.ingredients.some((ingredient) =>
                                allergens.some((allergen: string) =>
                                    ingredient.title.toLowerCase().includes(allergen),
                                ),
                            ),
                    );
                }
            }

            if (filters.drawer.allergensActive) {
                if (filters.drawer.selectedAllergens.length) {
                    const allergens = filters.drawer.selectedAllergens.map((a: string) =>
                        (russianAllergens[a] || a).toLowerCase(),
                    );
                    result = result.filter(
                        (recipe) =>
                            !recipe.ingredients.some((ingredient) =>
                                allergens.some((allergen: string) =>
                                    ingredient.title.toLowerCase().includes(allergen),
                                ),
                            ),
                    );
                }
            }

            if (filters.drawer.selectedMeatType.length > 0) {
                result = result.filter((recipe) =>
                    filters.drawer.selectedMeatType.includes(recipe.meat || ''),
                );
            }

            if (filters.drawer.selectedSideDishType.length > 0) {
                result = result.filter((recipe) =>
                    filters.drawer.selectedSideDishType.includes(recipe.side || ''),
                );
            }

            if (filters.drawer.selectedAuthors.length > 0) {
                result = result.filter((recipe) =>
                    filters.drawer.selectedAuthors.includes(recipe.author || ''),
                );
            }

            if (filters.drawer.selectedCategories.length > 0) {
                result = result.filter((recipe) =>
                    recipe.category.some((category) =>
                        filters.drawer.selectedCategories.includes(category),
                    ),
                );
            }

            if (query.length >= 3) {
                result = result.filter((recipe) => recipe.title.toLowerCase().includes(query));
            }

            state.filteredRecipe = result;
        },
        resetRecipes(state) {
            state.filteredRecipe = state.allRecipe;
        },
        filterRecipesBySearch(state, action) {
            const query = action.payload.trim().toLowerCase();
            state.filteredRecipe = state.allRecipe.filter((recipe) =>
                recipe.title.toLowerCase().includes(query),
            );
        },
        filterRecipesByOtherCriteria(state, action) {
            state.filteredRecipe = state.allRecipe.filter(action.payload);
        },
    },
});

export const { applyFilters, filterRecipesBySearch, resetRecipes, filterRecipesByOtherCriteria } =
    recipeSlice.actions;

export default recipeSlice.reducer;

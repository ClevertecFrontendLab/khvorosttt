import { RootState } from '~/store/configure-store';

import { FiltersStateI } from './filtersSlice';
import { RecipeStateI } from './recipeSlice';

export const selectedFilters = (state: RootState): FiltersStateI => state.filters;
export const selectedRecipes = (state: RootState): RecipeStateI => state.recipe;

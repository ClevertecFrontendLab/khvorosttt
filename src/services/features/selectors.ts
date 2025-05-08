import { RootState } from '~/store/configure-store';

import { CategoriesStateI } from './categoriesSlice';
import { FiltersStateI } from './filtersSlice';
import { NotificationStateI } from './notificationSlice';
import { RecipeStateI } from './recipeSlice';

export const selectedFilters = (state: RootState): FiltersStateI => state.filters;
export const selectedRecipes = (state: RootState): RecipeStateI => state.recipe;
export const selectedCategories = (state: RootState): CategoriesStateI => state.category;
export const selectedNotification = (state: RootState): NotificationStateI => state.notification;

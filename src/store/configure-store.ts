import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { categoriesApi } from '~/api/categoryApi';
import { apiSlice } from '~/query/create-api';
import { categoriesSlice } from '~/services/features/categoriesSlice';
import { filtersSlice } from '~/services/features/filtersSlice';
import { recipeSlice } from '~/services/features/recipeSlice';

import appReducer, { appSlice } from './app-slice';
const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    filters: filtersSlice.reducer,
    recipe: recipeSlice.reducer,
    category: categoriesSlice.reducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware).concat(categoriesApi.middleware),
    devTools: !isProduction,
});

export type RootState = ReturnType<typeof store.getState>;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { recipeI, recipeResponceI } from '~/interfaces/recipeI';

export const recipesApi = createApi({
    reducerPath: 'recipes',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru/recipe' }),
    tagTypes: ['Recipe'],
    endpoints: (builder) => ({
        getRecipes: builder.query<recipeI[], void>({
            query: () => '',
            transformResponse: (response: recipeResponceI) => response.data,
        }),
        getNewestRecipes: builder.query<recipeI[], void>({
            query: () => '?sortBy=createdAt&sortOrder=desc&limit=10',
            transformResponse: (response: recipeResponceI) => response.data,
        }),
        getJuiciestRecipes: builder.query<
            { recipes: recipeI[]; totalPages: number },
            { limit: number; page: number }
        >({
            query: ({ limit, page }) => `?sortBy=likes&sortOrder=desc&limit=${limit}&page=${page}`,
            transformResponse: (response: recipeResponceI) => ({
                recipes: response.data,
                totalPages: response.meta.totalPages,
            }),
        }),
        getRecipeBySubcategory: builder.query<
            { recipes: recipeI[]; totalPages: number },
            { id: string | undefined }
        >({
            query: ({ id }) => `/category/${id}`,
            transformResponse: (response: recipeResponceI) => ({
                recipes: response.data,
                totalPages: response.meta.totalPages,
            }),
        }),
        getRelevant: builder.query<recipeI[], { ids: string[]; limit: number }>({
            query: ({ ids, limit }) =>
                `/category/?limit=${limit}&subcategoriesIds=${ids.join(',')}`,
            transformResponse: (response: recipeResponceI) => response.data,
        }),
        getRecipeWithSearch: builder.query<
            { recipes: recipeI[]; totalPages: number },
            {
                ids: string[];
                limit: number;
                page: number;
                meat: string[];
                allergens: string[];
                searchString: string;
                garnish: string[];
            }
        >({
            query: ({ ids, limit, page, meat, allergens, searchString, garnish }) => {
                const idsStr = ids.length ? `&subcategoriesIds=${ids.join(',')}` : '';
                const allergensStr = allergens.length ? `&allergens=${allergens.join(',')}` : '';
                const meatStr = meat.length ? `&meat=${meat.join(',')}` : '';
                const garnishStr = garnish.length ? `&garnish=${garnish}` : '';
                const request: string = `?page=${page}&limit=${limit}${idsStr}${meatStr}${allergensStr}${garnishStr}&searchString=${searchString}`;
                return request;
            },
            transformResponse: (response: recipeResponceI) => ({
                recipes: response.data,
                totalPages: response.meta.totalPages,
            }),
        }),
    }),
});

export const {
    useGetRecipesQuery,
    useGetNewestRecipesQuery,
    useGetJuiciestRecipesQuery,
    useGetRecipeBySubcategoryQuery,
    useGetRelevantQuery,
    useGetRecipeWithSearchQuery,
} = recipesApi;

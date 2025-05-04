import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { recipeI, recipeResponceI } from '~/interfaces/recipeI';

export const recipesApi = createApi({
    reducerPath: 'recipes',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru/recipe' }),
    endpoints: (builder) => ({
        getRecipes: builder.query<recipeI[], void>({
            query: () => '',
            transformResponse: (response: recipeResponceI) => response.data,
        }),
        getNewRecipes: builder.query<recipeI[], void>({
            query: () => '?sortBy=createdAt&sortOrder=desc&&limit=10',
            transformResponse: (response: recipeResponceI) => response.data,
        }),
    }),
});

export const { useGetRecipesQuery, useGetNewRecipesQuery } = recipesApi;

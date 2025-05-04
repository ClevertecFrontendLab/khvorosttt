import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { categoryI } from '~/interfaces/categoryI';

export const categoriesApi = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru/category' }),
    endpoints: (builder) => ({
        getCategory: builder.query<categoryI[], void>({
            query: () => '',
            transformResponse: (response: categoryI[]) => {
                const categories: categoryI[] = response.filter(
                    (item: categoryI) => item.subCategories,
                );
                return categories;
            },
        }),
    }),
});

export const { useGetCategoryQuery } = categoriesApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { categoryI, subCategoryI } from '~/interfaces/categoryI';

export const categoriesApi = createApi({
    reducerPath: 'categories',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://marathon-api.clevertec.ru/category' }),
    endpoints: (builder) => ({
        getCategory: builder.query<
            { categories: categoryI[]; subcategories: subCategoryI[] },
            void
        >({
            query: () => '',
            transformResponse: (response: (categoryI | subCategoryI)[]) => {
                const categories: categoryI[] = [];
                const subcategories: subCategoryI[] = [];

                response.forEach((item) => {
                    if ('subCategories' in item) {
                        categories.push(item as categoryI);
                    } else {
                        subcategories.push(item as subCategoryI);
                    }
                });

                return { categories, subcategories };
            },
        }),
        getSubcategory: builder.query<subCategoryI[], void>({
            query: () => '',
            transformResponse: (response: subCategoryI[]) => {
                const subcategories: subCategoryI[] = response.filter(
                    (item: subCategoryI) => item.rootCategoryId,
                );
                return subcategories;
            },
        }),
        getSubcategoryById: builder.query<subCategoryI, string | undefined>({
            query: (id) => (id ? `/${id}` : ''),
        }),
        getCategoryById: builder.query<categoryI, string | undefined>({
            query: (id) => (id ? `/${id}` : ''),
        }),
    }),
});

export const {
    useGetCategoryQuery,
    useGetSubcategoryQuery,
    useGetSubcategoryByIdQuery,
    useGetCategoryByIdQuery,
} = categoriesApi;

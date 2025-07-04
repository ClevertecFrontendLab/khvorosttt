import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import {
    authI,
    errorI,
    fileI,
    loginI,
    restoreI,
    signUpI,
    successI,
    verifyOtpI,
} from '~/interfaces/authI';
import { bloggerInfoI, bloggersResponce, RecipesUserI } from '~/interfaces/bloggerI';
import { MeasureUnitsI, recipeI } from '~/interfaces/recipeI';
import { RecipeInputs, RecipeInputsOptional } from '~/pages/NewRecipe/NewRecipe';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://marathon-api.clevertec.ru',
    credentials: 'include',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const baseQueryWithTokenHandler: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let token = localStorage.getItem('access_token');
    if (!token) {
        const refreshResult = await rawBaseQuery(
            { url: '/auth/refresh', method: 'GET' },
            api,
            extraOptions,
        );

        if (refreshResult.meta?.response?.ok) {
            const newToken = refreshResult.meta.response.headers.get('Authentication-Access');
            if (newToken) {
                localStorage.setItem('access_token', newToken);
                token = newToken;
            }
        }
    }
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status) {
        const refreshResult = await rawBaseQuery(
            { url: '/auth/refresh', method: 'GET' },
            api,
            extraOptions,
        );

        if (refreshResult.meta?.response?.ok) {
            const newToken = refreshResult.meta.response.headers.get('Authentication-Access');
            if (newToken) {
                localStorage.setItem('access_token', newToken);

                result = await rawBaseQuery(args, api, extraOptions);
            } else {
                localStorage.removeItem('access_token');
            }
        } else {
            localStorage.removeItem('access_token');
        }
    }

    const freshToken = result.meta?.response?.headers.get('Authentication-Access');
    if (freshToken) {
        localStorage.setItem('access_token', freshToken);
    }

    return result;
};

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: baseQueryWithTokenHandler,
    tagTypes: ['Recipe', 'toggleSubscription'],
    endpoints: (builder) => ({
        check: builder.query<authI, void>({
            query: () => '/auth/check-auth',
        }),
        login: builder.mutation<successI | errorI, loginI>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation<successI | errorI, signUpI>({
            query: (credentials) => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        forgot: builder.mutation<successI | errorI, Pick<signUpI, 'email'>>({
            query: (credentials) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: credentials,
            }),
        }),
        verifyOtp: builder.mutation<successI | errorI, verifyOtpI>({
            query: (credentials) => ({
                url: '/auth/verify-otp',
                method: 'POST',
                body: credentials,
            }),
        }),
        restore: builder.mutation<successI | errorI, restoreI>({
            query: (credentials) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: credentials,
            }),
        }),
        measureUnits: builder.query<MeasureUnitsI[], void>({
            query: () => '/measure-units',
        }),
        uploadFile: builder.mutation<fileI, FormData>({
            query: (credentials) => ({
                url: '/file/upload',
                method: 'POST',
                body: credentials,
            }),
        }),
        addRecipe: builder.mutation<{ _id: string }, RecipeInputs>({
            query: (body) => ({
                url: '/recipe',
                method: 'POST',
                body,
            }),
        }),
        addDraft: builder.mutation<{ _id: string }, RecipeInputsOptional>({
            query: (body) => ({
                url: '/recipe/draft',
                method: 'POST',
                body,
            }),
        }),
        deleteRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Recipe', id }, { type: 'Recipe' }],
        }),
        likeRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}/like`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Recipe', id }],
        }),
        bookmarkRecipe: builder.mutation<void, string>({
            query: (id) => ({
                url: `/recipe/${id}/bookmark`,
                method: 'POST',
            }),
            invalidatesTags: (_result, _error, id) => [{ type: 'Recipe', id }],
        }),
        updateRecipe: builder.mutation<void, { id: string; data: RecipeInputs }>({
            query: ({ id, data }) => ({
                url: `/recipe/${id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (_result, _error, { id }) => [{ type: 'Recipe', id }],
        }),
        getRecipeById: builder.query<recipeI, string | undefined>({
            query: (id) => `/recipe/${id}`,
            providesTags: (_result, _error, id) => [{ type: 'Recipe', id }],
        }),
        getBloggers: builder.query<bloggersResponce, { currentUserId: string; limit?: string }>({
            query: ({ currentUserId, limit }) =>
                `/bloggers?currentUserId=${currentUserId}&limit=${limit !== undefined ? limit : ''}`,
            providesTags: (result) =>
                result?.others
                    ? result.others.map((b) => ({ type: 'toggleSubscription', id: b._id }))
                    : [{ type: 'toggleSubscription' }],
        }),
        toggleSubscription: builder.mutation<void, { fromUserId: string; toUserId: string }>({
            query: ({ fromUserId, toUserId }) => ({
                url: `/users/toggle-subscription`,
                method: 'PATCH',
                body: { fromUserId, toUserId },
            }),
            invalidatesTags: (_result, _error, { toUserId }) => [
                { type: 'toggleSubscription', id: toUserId },
            ],
        }),
        getUserById: builder.query<bloggerInfoI, { userId: string; currentUserId: string }>({
            query: ({ userId, currentUserId }) =>
                `/bloggers/${userId}?currentUserId=${currentUserId}`,
            providesTags: (_result, _error, { userId }) => [
                { type: 'toggleSubscription', id: userId },
            ],
        }),
        getRecipeByUser: builder.query<RecipesUserI, string | undefined>({
            query: (id) => `/recipe/user/${id}`,
            providesTags: (result) =>
                result?.recipes
                    ? result.recipes.map((r) => ({ type: 'Recipe', id: r._id }))
                    : [{ type: 'Recipe' }],
        }),
    }),
});

export const {
    useCheckQuery,
    useMeasureUnitsQuery,
    useLazyCheckQuery,
    useLoginMutation,
    useSignupMutation,
    useForgotMutation,
    useVerifyOtpMutation,
    useRestoreMutation,
    useUploadFileMutation,
    useAddDraftMutation,
    useAddRecipeMutation,
    useDeleteRecipeMutation,
    useBookmarkRecipeMutation,
    useLikeRecipeMutation,
    useUpdateRecipeMutation,
    useGetRecipeByIdQuery,
    useGetBloggersQuery,
    useToggleSubscriptionMutation,
    useGetUserByIdQuery,
    useGetRecipeByUserQuery,
} = authApi;

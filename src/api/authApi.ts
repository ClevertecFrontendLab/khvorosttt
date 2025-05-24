import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

import { authI, errorI, loginI, restoreI, signUpI, successI, verifyOtpI } from '~/interfaces/authI';

const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://marathon-api.clevertec.ru/auth',
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
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshResult = await rawBaseQuery(
            { url: '/refresh', method: 'POST' },
            api,
            extraOptions,
        );

        if (refreshResult.data) {
            const token = refreshResult.meta?.response?.headers.get('Authentication-Access');
            if (token) localStorage.setItem('access_token', token);
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            localStorage.removeItem('access_token');
        }
    }

    const token = result.meta?.response?.headers.get('Authentication-Access');
    if (token) localStorage.setItem('access_token', token);

    return result;
};

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: baseQueryWithTokenHandler,
    endpoints: (builder) => ({
        check: builder.query<authI, void>({
            query: () => '/check-auth',
        }),
        login: builder.mutation<successI | errorI, loginI>({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
        signup: builder.mutation<successI | errorI, signUpI>({
            query: (credentials) => ({
                url: '/signup',
                method: 'POST',
                body: credentials,
            }),
        }),
        forgot: builder.mutation<successI | errorI, Pick<signUpI, 'email'>>({
            query: (credentials) => ({
                url: '/forgot-password',
                method: 'POST',
                body: credentials,
            }),
        }),
        verifyOtp: builder.mutation<successI | errorI, verifyOtpI>({
            query: (credentials) => ({
                url: '/verify-otp',
                method: 'POST',
                body: credentials,
            }),
        }),
        restore: builder.mutation<successI | errorI, restoreI>({
            query: (credentials) => ({
                url: '/reset-password',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const {
    useCheckQuery,
    useLazyCheckQuery,
    useLoginMutation,
    useSignupMutation,
    useForgotMutation,
    useVerifyOtpMutation,
    useRestoreMutation,
} = authApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { authI, errorI, loginI, restoreI, signUpI, successI, verifyOtpI } from '~/interfaces/authI';

export const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://marathon-api.clevertec.ru/auth',
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('access_token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
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
    useLoginMutation,
    useSignupMutation,
    useForgotMutation,
    useVerifyOtpMutation,
    useRestoreMutation,
} = authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store/store";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_APP_API_URL,
        prepareHeaders(headers, { getState }) {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: 'token/',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: 'register/',
                method: 'POST',
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: (refreshToken) => ({
                url: 'logout/',
                method: 'POST',
                body: { refresh_token: refreshToken },
            }),
        }),
    }),
});


export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
} = api;

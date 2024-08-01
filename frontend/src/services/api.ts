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
        getProjects: builder.query({
            query: () => 'projects/',
        }),
        getProject: builder.query({
            query: (id) => `projects/${id}/`,
        }),
        createProject: builder.mutation({
            query: (newProject) => ({
                url: 'projects/',
                method: 'POST',
                body: newProject,
            }),
        }),
        updateProject: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `projects/${id}/`,
                method: 'PATCH',
                body: patch,
            }),
        }),
        getTodos: builder.query({
            query: (projectId) => `todos/?project=${projectId}`,
        }),
        createTodo: builder.mutation({
            query: (newTodo) => ({
                url: 'todos/',
                method: 'POST',
                body: newTodo,
            }),
        }),
        updateTodo: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `todos/${id}/`,
                method: 'PATCH',
                body: patch,
            })
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetProjectsQuery,
    useGetProjectQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useGetTodosQuery,
    useCreateTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation,
} = api;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    token: string | null;
    refresh: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: !!localStorage.getItem('token'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ access: string, refresh: string }>) => {
            state.token = action.payload.access;
            state.refresh = action.payload.refresh;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthUser } from "./types";

interface AuthState {
    user: AuthUser;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
        },
        setStatus: (state, action: PayloadAction<AuthState["status"]>) => {
            state.status = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logoutSuccess: (state) => {
            state.user = null;
        }
    }
});

export const { setUser, setStatus, setError, logoutSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
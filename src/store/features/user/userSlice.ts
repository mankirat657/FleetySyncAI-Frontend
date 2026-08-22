import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, User } from "../../../types/interfaces";

const initialState : AuthState = {
    user : null,
    loading : false,
    error : null,
    isAuthenticated : false,
    authChecked : false,

}
const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        setLoading(state,action : PayloadAction<boolean>){
            state.loading = action.payload
        },
        clearError(state){
            state.error = null;
        },
        loginSuccess(state,action : PayloadAction<User>){
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.authChecked = true;
        },
        registerSuccess(state){
            state.loading = false;
            state.error = null;
        },
        getMeSuccess(state,action : PayloadAction<User>){
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
            state.authChecked = true;
        },
        logoutState(state){
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
            state.error = null;
            state.authChecked = true;
        },
        setError(state,action : PayloadAction<string>){
            state.loading = false;
            state.error = action.payload;
        }
    }
})
export const { setLoading, clearError , loginSuccess,registerSuccess,getMeSuccess,logoutState,setError } = authSlice.actions;
export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Organization,OrgState } from "../../../types/interfaces";

const initialState : OrgState = {
    organization : null,
    loading : false,
    error : null,
    isOrgExist : false
}
const organizationSlice = createSlice({
    name : "org",
    initialState,
    reducers : {
        setLoading : (state,action : PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        clearError : (state) => {
            state.error = null;
        },
        orgCreateSuccess : (state,action : PayloadAction<Organization>) => {
            state.organization = action.payload,
            state.isOrgExist = true,
            state.loading = false,
            state.error = null
        },
        orgUpdateSuccess : (state,action : PayloadAction<Organization>) => {
            state.organization = action.payload,
            state.isOrgExist = true,
            state.loading = false,
            state.error = null
        },
        orgDeleteSuccess : (state) => {
            state.loading = false,
            state.error = null
        },
        setError(state,action : PayloadAction<string>){
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { setLoading,clearError,orgCreateSuccess,orgUpdateSuccess,orgDeleteSuccess,setError } = organizationSlice.actions;
export default organizationSlice.reducer;


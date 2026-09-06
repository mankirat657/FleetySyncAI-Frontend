import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Invitation,InviteState } from "../../../types/interfaces";

const initialState : InviteState = {
    invitation : null,
    loading : false,
    error : null,
    isAccepted : false
}
const invitationSlice = createSlice({
    name : "invite",
    initialState,
    reducers : {
        setLoading : (state,action : PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        clearError : (state) => {
            state.error = null;
        },
        inviteCreateSuccess : (state) => {
            state.loading = false;
            state.error = null;
        },
        inviteAcceptSuccess : (state,action: PayloadAction<Invitation>) => {
            state.invitation = action.payload;
            state.loading = false;
            state.error = null;
            state.isAccepted = true;
        },
        inviteRejectSuccess : (state,action: PayloadAction<Invitation>) =>{
            state.invitation = action.payload;
            state.loading = false;
            state.error = null;
            state.isAccepted = false;
        },
        inviteDeleteSuccess : (state,action: PayloadAction<Invitation>) => {
            state.loading = false;
            state.error = null;
        },
        setError : (state,action : PayloadAction<string>) => {
              state.loading = false;
            state.error = action.payload;
        }

    }

})
export const { setLoading,clearError,inviteCreateSuccess,inviteAcceptSuccess,inviteRejectSuccess,inviteDeleteSuccess,setError } = invitationSlice.actions;
export default invitationSlice.reducer;
import type { AppDispatch } from "../store";
import { setLoading, clearError, setError, inviteCreateSuccess, inviteAcceptSuccess, inviteRejectSuccess, inviteDeleteSuccess } from "../features/invitations/invitationSlice";
import { createInvitationsApi } from "../service/AuthService";


export const sendInvites = (emails: string[], id: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await createInvitationsApi(emails, id);
        if (response.data.success) {
            dispatch(inviteCreateSuccess());
            return response.data;
        }
        dispatch(setError(response.data.message || "Unexpected error occured"));
        return response.data;
    } catch (error : any) {
        const message = error.response?.data?.message || "Something went wrong"
        dispatch(setError(message))
        return {
            success: false,
            message
        }
    } finally{
        dispatch(setLoading(false))
    }
}
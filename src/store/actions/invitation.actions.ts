import type { AppDispatch } from "../store";
import { setLoading, clearError, setError, inviteCreateSuccess, updateRoleSuccess,getMembersSuccess, viewInvitationSuccess, inviteAcceptSuccess, inviteRejectSuccess, inviteDeleteSuccess } from "../features/invitations/invitationSlice";
import { acceptInvitationApi, createInvitationsApi, deleteInvitationApi, getAllMembersApi, getMyInvitationsApi, kickMemberApi, leaveOrganizationApi, rejectInvitationApi, updateRoleApi, viewInvitationApi } from "../service/AuthService";


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
};
export const viewInvitations = (id : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await viewInvitationApi(id);
        if(response.data.success){
            dispatch(viewInvitationSuccess(response.data.invitations));
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
    }finally{
        dispatch(setLoading(false));
    }
}
export const getInvitations = () => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await getMyInvitationsApi();
        if(response.data.success){
            dispatch(viewInvitationSuccess(response.data.invitations));
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
    }finally{
        dispatch(setLoading(false));
    }
}
export const acceptInvitations = (token : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await acceptInvitationApi(token);
        if(response.data.success){
            dispatch(inviteAcceptSuccess());
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
    }finally{
        dispatch(setLoading(false));
    }
}
export const rejectInvitations = (id : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await rejectInvitationApi(id);
        if(response.data.success){
            dispatch(inviteRejectSuccess());
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
        dispatch(setLoading(false));
    }
}
export const deleteInvitation = ( id : string ) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await deleteInvitationApi(id);
        if(response.data.success){
            dispatch(inviteDeleteSuccess());
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
        dispatch(setLoading(false));
    }
}
export const fetchMembers = ( id : string ) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await getAllMembersApi(id);
        if(response.data.success){
            dispatch(getMembersSuccess(response.data.members));
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
    }finally{
        dispatch(setLoading(false));
    }
}
export const changeRoles = (id : string, memId : string, role : string) => async(dispatch : AppDispatch ) =>{
    try {
        dispatch(setLoading(true));
        const response = await updateRoleApi(id,memId,role);
        if(response.data.success){
            dispatch(updateRoleSuccess());
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
    }finally{
        dispatch(setLoading(false))
    }
}
export const kickMember = ( id : string,memId : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await kickMemberApi(id,memId);
        if(response.data.success){
            dispatch(clearError());
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
    }finally{
        dispatch(setLoading(false));
    }
}
export const leaveOrganization = ( id : string ) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await leaveOrganizationApi(id);
        if(response.data.success){
            dispatch(clearError());
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
    }finally{
        dispatch(setLoading(false));
    }
}
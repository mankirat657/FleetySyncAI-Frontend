import type { AppDispatch } from "../store";
import { setLoading, setError, clearError, orgCreateSuccess, getOrganizationSuccess, orgUpdateSuccess, orgDeleteSuccess } from "../features/organization/organizationSlice";
import type { CreateOrganizationData } from "../../types/interfaces";
import { createOrganizationApis, deleteOrganizationApi, getAOrganizationApi, getOrganizationsApi, updateOrganizationApis } from "../service/AuthService";

export const createOrganization = (name: string, description: string, logo: File | null) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await createOrganizationApis(name, description, logo);
        if (response.data.success) {
            dispatch(orgCreateSuccess(response.data.organization));
            return response.data;
        }
        dispatch(setError(response.data.message || "Unexpected error occured"));
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || "Something went wrong"
        dispatch(setError(message))
        return {
            success: false,
            message
        }
    } finally {
        dispatch(setLoading(false));
    }
}
export const getMeOrganization = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await getOrganizationsApi();
        if (response.data.success) {
            dispatch(getOrganizationSuccess(response.data.organization));
            return response.data;
        }
        dispatch(setError(response.data.message || "Unexpected error occured"));
        return response.data;
    } catch (error: any) {
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
export const updateOrganization = (id : string, name : string,description : string, logo : File | null) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await updateOrganizationApis(id,name,description,logo);
        if(response.data.success){
            dispatch(orgUpdateSuccess(response.data.organization));
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
export const fetchOrganization = (id : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await getAOrganizationApi(id);
        if(response.data.success){
            dispatch(getOrganizationSuccess(response.data.organization));
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
export const RemoveOrganization = (id : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await deleteOrganizationApi(id);
        if(response.data.success){
            dispatch(orgDeleteSuccess());
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
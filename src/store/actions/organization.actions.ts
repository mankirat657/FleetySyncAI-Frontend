import type { AppDispatch } from "../store";
import { setLoading, setError, clearError, orgCreateSuccess, orgUpdateSuccess, orgDeleteSuccess } from "../features/organization/organizationSlice";
import type { CreateOrganizationData } from "../../types/interfaces";
import { createOrganizationApis } from "../service/AuthService";

export const createOrganization = (name: string, description: string, logo: File) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await createOrganizationApis(name, description, logo);
        if (response.data.success) {
            dispatch(orgCreateSuccess(response.data.organization));
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
import type { AppDispatch } from "../store";
import { setLoading, loginSuccess, setError, registerSuccess, getMeSuccess, logoutState, clearError } from "../features/user/userSlice";
import type { loginData, RegisterData } from "../../types/interfaces";
import { getMeApi, loginApi, logoutApi, registerApi, setAccessTokenApi, verifyEmailApi } from "../service/AuthService";

export const registeration = (data: RegisterData) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await registerApi(data);
        if (response.data.success) {
            dispatch(registerSuccess());
            return response.data;
        }
        dispatch(setError(response.data.message || "Registration Failed"))
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
export const userLogin = ( data: loginData ) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await loginApi(data);
        if(response.data.success){
            dispatch(loginSuccess(response.data.user));
            return response.data;
        }
        dispatch(setError(response.data.message || "userLogin Failed"));
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
export const emailVerification = (data: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await verifyEmailApi(data);
        if (response.data.success && response.data.user) {
            dispatch(loginSuccess(response.data.user));
            return response.data;
        }
        dispatch(setError(response.data.message || "Email verification failded"));

    } catch (error: any) {
        const message = error.response?.data?.message || "Verfication link expired or invalid";
        dispatch(setError(message));
        return {
            success: false,
            message
        }
    } finally {
        dispatch(setLoading(false));
    }
}
export const getMe = () => async (dispatch : AppDispatch) => {
    try {
         dispatch(setLoading(true));
        const response = await getMeApi();
        if(response.data.success){
            dispatch(getMeSuccess(response.data.user));
            return response.data;
        }
        dispatch(setError(response.data.message || "failed fetching userDetails"));

    } catch (error : any) {
        if (error.response?.status === 401) {
            dispatch(logoutState());
        } else {
            dispatch(clearError());
        }
     
    } finally{
        dispatch(setLoading(false));
    }
}
export const refreshTokenSetup = () => async( dispatch : AppDispatch ) => {
    try {
        dispatch(setLoading(true));
        const response = await setAccessTokenApi();
        if(response.data.success){
            return response.data;
        }
        dispatch(setError(response.data.message || "Unexpected error occured"));
    } catch (error : any) {
        const message = error.response?.data?.message || "Unexpected error occured";
        dispatch(setError(message));
        return {
            success: false,
            message
        }
    } finally{
        dispatch(setLoading(false));
    }
}
export const userLogout = () => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await logoutApi();
        if(response.data.success){
            dispatch(logoutState());
            return response.data;
        }
        dispatch(setError(response.data.message || "Unexpected error occured"));

    } catch ( error : any ) {
        const message = error.response?.data?.message || "Unexpected error occured";
        dispatch(setError(message));
        return {
            success: false,
            message
        }
    } finally{
        dispatch(setLoading(false));
    }
}
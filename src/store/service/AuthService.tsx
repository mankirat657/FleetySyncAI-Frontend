import { axiosInstance } from "../../services/axios";
import type { loginData, RegisterData } from "../../types/interfaces";
/***** Authentication flows api's ********/
export const registerApi = (data : RegisterData) =>{
    return axiosInstance.post("/auth/register",data);
}
export const loginApi = ( data : loginData ) => {
    return axiosInstance.post("/auth/login",data);
}
export const verifyEmailApi = (token : string) => {
    return axiosInstance.get(`/auth/verify-email/${token}`);
}
export const getMeApi = () => {
    return axiosInstance.get('/auth/me');
}
export const setAccessTokenApi = () => {
    return axiosInstance.post('/auth/refresh-token')
}
export const logoutApi = () => {
    return axiosInstance.delete('/auth/logout');
}
export const forgotPasswordApi = (email : string) => {
    return axiosInstance.patch("/auth/forgotPassword",{ email });
}
export const resetPasswordApi = (token : string, password : string) => {
    return axiosInstance.patch(`/auth/reset-password/${token}`,{ password });
}
export const resendEmailApi = ( email : string ) => {
    return axiosInstance.post('/auth/resend-verification', { email })
}
/************** Organizaiton Api's ******************/
export const createOrganizationApis = (name : string, description : string, logo : File | null ) => {
    const formData = new FormData();

    formData.append("name",name);
    formData.append("description",description);
    if(logo){
        formData.append("file",logo);
    }
    return axiosInstance.post('/org/createOrganization', formData);
}
export const updateOrganizationApis = (id : string,name : string, description : string, logo : File | null) => {
    const formData = new FormData();

    formData.append("name",name);
    formData.append("description",description);
    if(logo){
        formData.append("file",logo);
    }
    return axiosInstance.patch(`/org/orgranizations/${id}`,formData)
}
export const getOrganizationsApi = () => {
    return axiosInstance.get('/org/organizations/me');
}
export const getAOrganizationApi = (id : string) => {
    return axiosInstance.get(`/organizations/${id}`);
}
/*********** Invitation's Api's*****************/
export const createInvitationsApi = (emails : string[],id : string) =>{
    return axiosInstance.post(`/invite/invitations/${id}/invite`, { emails });
}

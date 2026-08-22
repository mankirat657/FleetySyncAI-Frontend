import { axiosInstance } from "../../services/axios";
import type { loginData, RegisterData } from "../../types/interfaces";

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

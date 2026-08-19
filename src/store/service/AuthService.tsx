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
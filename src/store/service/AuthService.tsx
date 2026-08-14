import { axiosInstance } from "../../services/axios";
import type { loginData, RegisterData } from "../../types/interfaces";

export const registerApi = (data : RegisterData) =>{
    return axiosInstance.post("/auth/register",data);
}
export const loginApi = ( data : loginData ) => {
    return axiosInstance.post("/auth/login",data);
}
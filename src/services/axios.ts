import axios from "axios";
import { store } from "../store/store";
import { logoutState } from "../store/features/user/userSlice";
import { setAccessTokenApi } from "../store/service/AuthService";

export const axiosInstance = axios.create({
    baseURL : "http://localhost:3000/api/v1",
    withCredentials : true
})
/* axios to regenerate refresh Token */
let isRefreshing = false;
let failedQueue : Array<{
    resolve: (value ?: unknown) => void;
    reject : (reason ?:any) => void;
}> = [];


const processQueue = (error : any = null) => {
    failedQueue.forEach((promise) => {
        if(error){
            promise.reject(error);
        }else{
            promise.resolve()
        }
    });
    failedQueue = [];
}
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/login") &&
      !originalRequest.url?.includes("/auth/refresh-token")
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await setAccessTokenApi();
        
        if (response.data.success) {
          processQueue(null); 
          return axiosInstance(originalRequest); 
        }
      } catch (refreshError) {
        processQueue(refreshError);
        store.dispatch(logoutState()); 
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
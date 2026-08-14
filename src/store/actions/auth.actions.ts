import type { AppDispatch } from "../store";
import { setLoading, loginSuccess,setError,registerSuccess} from "../features/user/userSlice";
import type {  RegisterData } from "../../types/interfaces";
import { registerApi } from "../service/AuthService";

export const register = ( data : RegisterData) => async( dispatch : AppDispatch ) => {
    try {
        dispatch(setLoading(true));
        const response = await registerApi(data);
        if(response.data.success){
            dispatch(registerSuccess());
            return response.data;
        }
        dispatch(setError(response.data.message || "Registration Failed"))
    } catch (error : any) {
        dispatch(setError(error.response?.data?.message || "Something went wrong"))
    }
}
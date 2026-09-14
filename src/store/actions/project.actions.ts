import { setLoading, clearError, updateProjectSuccess, archiveProjectSuccess ,setError, projectCreateSuccess, getProjectSuccess } from '../features/Projects/projectSlice'
import { createProjectApi, deleteProjectApi, getProjectsApi, updateProjectApi } from '../service/AuthService';
import type { AppDispatch } from '../store'


export const createProject = (id: string, projectName: string, description: string, status: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(setLoading(true));

        const response = await createProjectApi(id, projectName, description, status);
        if (response.data.success) {
            dispatch(projectCreateSuccess(response.data.project));
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
export const fetchProjects = (id : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await getProjectsApi(id);
        if(response.data.success){
            dispatch(getProjectSuccess(response.data.projects));
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
export const updateProject = (id : string,projectName : string, description : string, status : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await updateProjectApi(id,projectName,description,status);
        if(response.data.success){
            dispatch(updateProjectSuccess(response.data.project));
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
export const archiveProject = (projectId : string) => async(dispatch : AppDispatch) => {
    try {
        dispatch(setLoading(true));
        const response = await deleteProjectApi(projectId);
        if(response.data.success){
            dispatch(archiveProjectSuccess());
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
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Project,ProjectState } from '../../../types/interfaces' 

const initialState : ProjectState = {
    projects : null,
    loading : false,
    error : null
}
const projectSlice = createSlice({
    name : "Project",
    initialState,
    reducers : {
        setLoading : (state, action : PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        clearError : (state) => {
            state.error = null;
        },
        projectCreateSuccess : (state,action : PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
        },
        getProjectSuccess : (state,action : PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
        } 
        ,setError(state,action : PayloadAction<string>){
            state.loading = false;
            state.error = action.payload;
        },
        updateProjectSuccess : (state,action : PayloadAction<Project[]>) => {
            state.projects = action.payload;
            state.loading = false;
            state.error = null;
        },
        archiveProjectSuccess : (state) => {
            state.error = null;
            state.loading = false;
        }
    }
})
export const { setLoading, setError, updateProjectSuccess, archiveProjectSuccess ,clearError, projectCreateSuccess,getProjectSuccess } = projectSlice.actions;
export default projectSlice.reducer;
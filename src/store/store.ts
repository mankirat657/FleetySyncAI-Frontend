import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/user/userSlice'
import orgReducer from './features/organization/organizationSlice';
import invitationReducer from './features/invitations/invitationSlice'
import projectReducer from './features/Projects/projectSlice';
export const store = configureStore({
    reducer : {
        auth : authReducer,
        org : orgReducer,
        invite : invitationReducer,
        project : projectReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
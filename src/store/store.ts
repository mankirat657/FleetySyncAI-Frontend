import { configureStore } from "@reduxjs/toolkit";
import authReducer from './features/user/userSlice'
import orgReducer from './features/organization/organizationSlice'
export const store = configureStore({
    reducer : {
        auth : authReducer,
        org : orgReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
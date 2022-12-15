import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer from './features/auth/authSlice'
import articleReducer from './features/articles/articleSlice'

export const store= configureStore({
    reducer: {
        auth: authReducer,
        article: articleReducer
    },
    middleware: (getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false
        })
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
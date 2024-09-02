import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./features/user";
import participantsReducer from './features/participants' ;

export const store=configureStore({
    reducer:{
        user:userReducer ,
        participants:participantsReducer ,
    },
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

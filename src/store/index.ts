import { configureStore } from "@reduxjs/toolkit";
import simplexEventSlice from "../state/Simplex/simplexEventSlice";

export const store = configureStore({
    reducer:{
        simplexEvent :simplexEventSlice
    }
})

export type RootState  = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
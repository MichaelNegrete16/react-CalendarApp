import { configureStore } from "@reduxjs/toolkit";
import { uiReducer } from "../reducers/uiReducer";

export const store = configureStore({
    reducer:{
        ui:uiReducer
    }
})
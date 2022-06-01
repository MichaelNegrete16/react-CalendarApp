import { configureStore } from "@reduxjs/toolkit";
import { calendarReducer } from "../reducers/calendarReduce";
import { uiReducer } from "../reducers/uiReducer";

export const store = configureStore({
    reducer:{
        ui:uiReducer,
        calendar: calendarReducer
    }
})
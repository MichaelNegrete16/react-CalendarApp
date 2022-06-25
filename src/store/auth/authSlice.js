import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name:'auth',
    initialState:{
        // El status sera para saber si la persona esta autenticada o no
        status: 'checking',  // 'authenticated' , 'not-authenticated'
        user: {},
        errrorMessage: undefined
    },
    reducers:{

        onChecking: (state) => {
            state.status = 'checking'
            state.user = {}
            state.errrorMessage = undefined
        },
        
        onLogin: (state,{payload}) => {
            state.status = 'authenticated',
            state.user = payload,
            state.errrorMessage = undefined
        },

        onLogout: (state,{payload}) => {
            state.status = 'not-authenticated'
            state.user = {}
            state.errrorMessage = payload
        },

        clearErrorMessage: (state) => {
            state.errrorMessage = undefined
        }

        

    }
})

export const {onChecking,onLogin,onLogout,clearErrorMessage} = authSlice.actions
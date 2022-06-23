import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
    _id: new Date().getTime(),
    title:'Cunpleaños del jefe',
    notes:'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    user:{
      uid: 123,
      name: 'Michael'
    }
  }


export const calendarSlice = createSlice({

    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },

    reducers:{
       onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload
       }
    }
})

export const {onSetActiveEvent} = calendarSlice.actions
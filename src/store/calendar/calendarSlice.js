import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
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

    name: 'ui',
    initialState: {
        events: [tempEvent],
        activeEvent: null
    },

    reducers:{
       
    }
})

export const {} = calendarSlice.actions
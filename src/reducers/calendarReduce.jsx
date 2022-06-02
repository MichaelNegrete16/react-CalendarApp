import moment from "moment"
import { types } from "../types/types"

const initialState = {
    events :[{
        title: 'cumpleaños del jefe',
        startDate: moment().toDate(),
        endDate: moment().add(2, 'hour').toDate(),
        notes:'Comprar el pastel',
        user:{
          _id:'123',
          name:'Michael'
        }
      }],
    activeEvent: null
}

export const calendarReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }
    
        default:
            return state
    }
}
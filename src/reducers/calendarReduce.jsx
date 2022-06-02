import { type } from "@testing-library/user-event/dist/type"
import moment from "moment"
import { types } from "../types/types"

const initialState = {
    events :[{
        id: new Date().getTime(),
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
        
        case types.eventUpdate:
            return{
                ...state,
                events: state.events.map(e => e.id === action.payload.id ? action.payload : e)
            }
        
        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(e => e.id !== state.activeEvent.id),
                activeEvent:null
            }
    
        default:
            return state
    }
}
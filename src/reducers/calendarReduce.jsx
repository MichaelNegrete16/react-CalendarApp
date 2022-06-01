import moment from "moment"
import { types } from "../types/types"

const initialState = {
    events :[{
        title: 'cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add(2, 'hour').toDate(),
        bgcolor: '#fafafa',
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

        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
    
        default:
            return state
    }
}
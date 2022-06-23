import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events,activeEvent } = useSelector(state => state.calendar)

    // llamar y hacer dispatch
    const setActiveEvent = (calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        // TODO: llegar al backen

        // Todo Bien

        if(calendarEvent._id){
            // Actualziando
            dispatch(onUpdateEvent({...calendarEvent}))
        }else{
            // Creando
            dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
        }
    }

    const startDeleteEvent = () => {
        // TODO: llegar al backend
        dispatch(onDeleteEvent())
    }

    return {
         //* Propiedades
         events,
         activeEvent,
         hasEventSelected: !!activeEvent,
         //* Metodos
         setActiveEvent,
         startSavingEvent,
         startDeleteEvent,
  }
}


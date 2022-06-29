import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events,activeEvent } = useSelector(state => state.calendar)
    const { user } = useSelector(state => state.auth)

    // llamar y hacer dispatch
    const setActiveEvent = (calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
        // TODO: Update event

        if(calendarEvent._id){
            // Actualziando
            dispatch(onUpdateEvent({...calendarEvent}))
        }else{
            // Creando
            // Hacer post a la base de datos
            const {data} = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({...calendarEvent, id: data.msg.id, user}))
            
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


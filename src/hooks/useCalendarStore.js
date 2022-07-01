import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { convertEventsToDate } from "../helpers/convertEventsToDate"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"


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

    // Cargar los enventos del backend
    const startLoadingEvents = async() => {
        try {
            
            const {data} = await calendarApi.get('/events')
            const events = convertEventsToDate(data.msg)
            dispatch(onLoadEvents(events))

        } catch (error) {
            console.log(error)
        }
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
         startLoadingEvents,
  }
}


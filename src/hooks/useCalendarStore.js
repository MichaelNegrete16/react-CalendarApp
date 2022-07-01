import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2"
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

        try {
            if(calendarEvent.id){
                // Actualziando
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch(onUpdateEvent({...calendarEvent, user}))
                return
            }
            
            // Creando
            // Hacer post a la base de datos
            const {data} = await calendarApi.post('/events', calendarEvent)
            dispatch(onAddNewEvent({...calendarEvent, id: data.msg.id, user}))
        } catch (error) {
            console.log(error)
            Swal.fire('Error al guardar',error.response.data.msg,'error')
        }
            
        
    }

    const startDeleteEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent())
        } catch (error) {
            console.log(error)
            Swal.fire('Error al eliminar',error.response.data.msg,'error')
        }
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


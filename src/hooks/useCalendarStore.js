import { useDispatch, useSelector } from "react-redux"
import { onSetActiveEvent } from "../store/calendar/calendarSlice"


export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const { events,activeEvent } = useSelector(state => state.calendar)

    // llamar y hacer dispatch
    const setActiveEvent = (calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent))
    }

    return {
         //* Propiedades
         events,
         activeEvent,
         //* Metodos
         setActiveEvent,
  }
}

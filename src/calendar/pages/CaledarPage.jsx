import { useEffect, useState } from 'react'
import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Helpers
import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'

// Componentes
import Navbar from '../components/Navbar'
import CalendarEvent from '../components/CalendarEvent'
import CalendarModal from '../components/CalendarModal'
import FabAddNew from '../components/FabAddNew'
import FabDelete from '../components/FabDelete'

// Custom - Hooks
import { useUiStore } from '../../hooks/useUiStore'
import {useCalendarStore} from '../../hooks/useCalendarStore'
import { useAuthStore } from '../../hooks/useAuthStore'


const CaledarPage = () => {

  const {user} = useAuthStore()
  const {openDateModal} = useUiStore()
  const {events, setActiveEvent, startLoadingEvents} = useCalendarStore()

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event,start,end,isSelected) => {

      const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid)

      const style ={
        backgroundColor: isMyEvent ? 'black' : 'green',
        borderRadius: '5px',
        opacity: 0.8,
        color:'white'
      }
      return{
        style
      }
  }

  const onDoubleClick = () => {
      // console.log({doubleClick: event})
      openDateModal()
  }
  const onSelect = event => {
      setActiveEvent(event)
  }
  const onViewChange = event => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  // Cargar los eventos del backend
  useEffect(() => {
    startLoadingEvents()
  }, [])
  

  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh -  80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />

      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>

    </>
  )
}

export default CaledarPage
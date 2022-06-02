import React, { useState } from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import Navbar from '../ui/Navbar'
import { mensajes } from '../../helpers/calendar-messages-es'

// Redux
import { useDispatch, useSelector } from 'react-redux'

// Cambiar idioma del moment
import 'moment/locale/es'
import CalendarEvent from './CalendarEvent'
import CalendarModal from './CalendarModal'
import { openModal } from '../../actions/ui'
import { eventSetActive } from '../../actions/events'
import AddNewFab from '../ui/AddNewFab'
moment.locale('es')

const localizer = momentLocalizer(moment)
// const events = [{
//   title: 'cumpleaños del jefe',
//   start: moment().toDate(),
//   end: moment().add(2, 'hour').toDate(),
//   notes:'Comprar el pastel',
//   user:{
//     _id:'123',
//     name:'Michael'
//   }
// }]

const CalendarScreen = () => {

  const dispatch = useDispatch()
  const {events} = useSelector(state => state.calendar)
  const [lasView, setLasView] = useState(localStorage.getItem('lastView') || 'month')

  // Eventos
  const onDoubleClick = (e) => {
    dispatch(openModal())
  }
  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e))
  }
  const onViewChange = (e) => {
    setLasView(e)
      localStorage.setItem('lastView', e)
  }

  const eventStyleGetter = (event, start,end, isSelected) => {
    const style = {
      backgroundColor: '#367cf7',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }  
    return {
        style
      }
  }

  return (
    <div className='calendar-screen'>
        <Navbar/>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="startDate"
          endAccessor="endDate"
          messages={mensajes}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          view={lasView}
          components={{
            event: CalendarEvent
          }}
        />

          <AddNewFab/>
          <CalendarModal/>

    </div>
  )
}

export default CalendarScreen
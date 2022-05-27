import React from 'react'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import moment from 'moment'

import Navbar from '../ui/Navbar'
import { mensajes } from '../../helpers/calendar-messages-es'

// Cambiar idioma del moment
import 'moment/locale/es'
moment.locale('es')

const localizer = momentLocalizer(moment)
const events = [{
  title: 'cumpleaños del jefe',
  start: moment().toDate(),
  end: moment().add(2, 'hour').toDate(),
  bgcolor: '#fafafa',
  notes:'Comprar el pastel'
}]

const CalendarScreen = () => {

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
          startAccessor="start"
          endAccessor="end"
          messages={mensajes}
          eventPropGetter={eventStyleGetter}
        />
    </div>
  )
}

export default CalendarScreen
import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns/esm'

import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'

import Navbar from '../components/Navbar'
import CalendarEvent from '../components/CalendarEvent'
import { useState } from 'react'
import CalendarModal from '../components/CalendarModal'


const event = [{
  title:'Cunpleaños del jefe',
  notes:'Hay que comprar el pastel',
  start: new Date(),
  end: addHours(new Date(), 2),
  user:{
    uid: 123,
    name: 'Michael'
  }
}]




const CaledarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event,start,end,isSelected) => {
      const style ={
        backgroundColor: 'black',
        borderRadius: '5px',
        opacity: 0.8,
        color:'white'
      }
      return{
        style
      }
  }

  const onDoubleClick = event => {
      console.log({doubleClick: event})
  }
  const onSelect = event => {
      console.log({click: event})
  }
  const onViewChange = event => {
    localStorage.setItem('lastView', event)
    setLastView(event)
  }

  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        messages={getMessagesES()}
        localizer={localizer}
        events={event}
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

    </>
  )
}

export default CaledarPage
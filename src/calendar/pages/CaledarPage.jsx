import { Calendar} from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns/esm'

import { localizer } from '../../helpers/calendarLocalizer'
import { getMessagesES } from '../../helpers/getMessages'

import Navbar from '../components/Navbar'
import CalendarEvent from '../components/CalendarEvent'


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

  return (
    <>
      <Navbar/>

      <Calendar
        culture='es'
        messages={getMessagesES()}
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh -  80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
      />

    </>
  )
}

export default CaledarPage
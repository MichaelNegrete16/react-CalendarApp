import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours, parse, startOfWeek, getDay, format } from 'date-fns/esm'
import enUS from 'date-fns/locale/en-US'

import Navbar from '../components/Navbar'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

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
  return (
    <>
      <Navbar/>

      <Calendar
        localizer={localizer}
        events={event}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh -  80px)' }}
      />

    </>
  )
}

export default CaledarPage
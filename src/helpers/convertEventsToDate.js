import { parseISO } from "date-fns"

// Helpér para convertir de String a Number
export const convertEventsToDate = (events = []) => {
    return events.map(event => {
        event.start = parseISO(event.start)
        event.end = parseISO(event.end)
        return event
    })
}
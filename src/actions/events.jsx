import { types } from "../types/types"

export const eventAddNew = event => {
    return{
        type: types.eventAddNew,
        payload: event
    }
}

export const eventSetActive = event => {
    return{
        type: types.eventSetActive,
        payload: event
    }
}

export const eventClearActiveEvent = () => {
    return {
        type: types.eventClearActiveEvent
    }
}

export const eventUpdateElement = event => {
    return{
        type:types.eventUpdate,
        payload:event
    }
}

export const eventDeletedElement = () => {
    return{
        type:types.eventDeleted,
    }
}
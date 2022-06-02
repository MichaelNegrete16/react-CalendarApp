import React from 'react'
import { useDispatch } from 'react-redux'
import { eventDeletedElement } from '../../actions/events'

const DeletedEventFab = () => {

    const dispatch = useDispatch()

    const handleDeleted = () => {
        dispatch(eventDeletedElement())
    }

    return (
        <button className='btn btn-danger fab-danger' onClick={handleDeleted}>
            <i className='fas fa-trash'></i>
            <span>Borrar Evento</span>
        </button>
    )
}

export default DeletedEventFab
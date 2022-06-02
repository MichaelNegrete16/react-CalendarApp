import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { closeModa } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdateElement } from '../../actions/events';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).hour(1,'hours')
const end = now.clone().add(1,'hours')

const initEvent = {
    title:'',
    note:'',
    startDate: now.toDate(),
    endDate: end.toDate()
}

const CalendarModal = () => {

    const {modalOpen} = useSelector(state => state.ui)
    const {activeEvent} = useSelector(state => state.calendar)
    const dispatch = useDispatch()

    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(end.toDate())
    const [titleValid, setTitleValid] = useState(true)

    const [formValues, setFormValues] = useState(initEvent)

    const {title,notes,startDate,endDate} = formValues

    // Mostrar los datos al dar dobleClick en el modal
    useEffect(() => {
        if(activeEvent){
            setFormValues(activeEvent)
        }else{
            setFormValues(initEvent)
        }
    }, [activeEvent, setFormValues])
    

    const handleInputChange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(closeModa())
        // Restablecer los valores del form y del event
        dispatch(eventClearActiveEvent())
        setFormValues(initEvent)
        
    }

    const handleStartDateChange = e => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            startDate: e
        })
    }
    const handleEndDateChange = e => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            endDate: e
        })
    }

    const handleSubmitForm = e => {
        e.preventDefault()
        
        const momentStart = moment(startDate)
        const momentEnd = moment(endDate)

        if( momentStart.isSameOrAfter(momentEnd) ){
            return Swal.fire('Error','La fecha final debe ser mayor a la de inicio', 'error')       
        }
        if(title.trim().length < 2){
            return setTitleValid(false)
        }
        
        if(activeEvent){
            dispatch(eventUpdateElement(formValues))
        }else{
            dispatch(eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user:{
                    _id:'123',
                    name:'Jackson'
                }
            }))
        }

        setTitleValid(true)
        closeModal()

    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> {activeEvent ? 'Editar Evento' : 'Nuevo evento'} </h1>
            <hr />
            <form className="container" onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker className='form-control' onChange={handleStartDateChange} value={dateStart} />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker className='form-control' minDate={dateStart} onChange={handleEndDateChange} value={dateEnd} />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}

export default CalendarModal
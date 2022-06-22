import { addHours } from "date-fns";
import { useState } from "react";

import Modal from "react-modal"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const CalendarModal = () => {
    
    const [isOpen, setIsOpen] = useState(true)

    const [formValues, setFormValues] = useState({
        title: 'Michael',
        notes: 'Negrete',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const onInputchange = ({target}) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onDatechange = (event, changin) => {
        setFormValues({
            ...formValues,
            [changin]:event
        })
    }

    const onCloseModal = () => {
        console.log('Cerrando modal')
        setIsOpen(false)
    }

    return (
        <Modal 
            isOpen={isOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={formValues.start}
                        onChange={e => onDatechange(e, 'start')}
                        className='form-control'
                        dateFormat="Pp"
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker 
                        minDate={formValues.start}
                        selected={formValues.end}
                        onChange={e => onDatechange(e, 'end')}
                        className='form-control'
                        dateFormat="Pp"
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputchange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputchange}
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
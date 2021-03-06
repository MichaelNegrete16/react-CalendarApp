import { addHours,differenceInSeconds } from "date-fns";
import { useMemo, useState } from "react";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.min.css'

import Modal from "react-modal"
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// Colocar el datePicker en español
import es from 'date-fns/locale/es'
registerLocale('es',es)

import { useUiStore } from "../../hooks/useUiStore";
import { useEffect } from "react";
import { useCalendarStore } from "../../hooks/useCalendarStore";


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
    
    const {isDateModalOpen,closeDateModal} = useUiStore()
    const {activeEvent, startSavingEvent} = useCalendarStore()
    const [formsSubmited, setFormsSubmited] = useState(false)

    const [formValues, setFormValues] = useState({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    // Cambiar la clase para poner si es valido o no
    const titleClass = useMemo(() => {

        if(!formsSubmited) return ''
        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'

    }, [formValues.title, formsSubmited])

    // Poner los datos en el modal
    useEffect(() => {
        if(activeEvent !== null){
            setFormValues({...activeEvent})
        }
    }, [activeEvent])
    

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
        closeDateModal()
    }

    const onSubmit = async e => {
        e.preventDefault()
        // Saber si el formulario a sido intentado postear
        setFormsSubmited(true)

        // Validar que la fecha final sea mayor que la inicial
        const difference = differenceInSeconds(formValues.end, formValues.start)

        if(isNaN( difference ) || difference <= 0 ){
            Swal.fire('Fechas incorrectas','Revisar las fechas ingresadas','error')
            return
        }

        // Validar que coloque un titulo
        if( formValues.title.length <= 0 ) return

        console.log(formValues)

        // Guardar datos del formulario
        await startSavingEvent(formValues)
        closeDateModal()
        setFormsSubmited(false)

    }

    return (
        <Modal 
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
            className='modal'
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker 
                        selected={formValues.start}
                        onChange={e => onDatechange(e, 'start')}
                        className='form-control'
                        dateFormat="Pp"
                        showTimeSelect
                        locale={es}
                        timeCaption='Hora'
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
                        showTimeSelect
                        locale={es}
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${titleClass}`}
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
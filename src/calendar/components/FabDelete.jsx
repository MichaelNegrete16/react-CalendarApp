import { useCalendarStore } from '../../hooks/useCalendarStore'

const FabDelete = () => {

    const {startDeleteEvent, hasEventSelected} = useCalendarStore()

    const handleClickDelete = () => {
        startDeleteEvent()
    }

    return (
        <button style={{
                    display: hasEventSelected ? '' : 'none'
                }}
                className='btn btn-danger fa-danger' 
                onClick={handleClickDelete}>
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}

export default FabDelete
import { addHours } from 'date-fns'
// Hooks
import { useCalendarStore } from '../../hooks/useCalendarStore'
import { useUiStore } from '../../hooks/useUiStore'

const FabAddNew = () => {

    const {openDateModal} = useUiStore()
    const {setActiveEvent} = useCalendarStore()

    const handleClickNew = () => {
        setActiveEvent({
            title:'',
            notes:'',
            start: new Date(),
            end: addHours(new Date(), 2),
            user:{
                uid: 123,
                name: 'Michael'
            }
        })
        openDateModal()
    }

    return (
        <button className='btn btn-primary fab' onClick={handleClickNew}>
            <i className='fas fa-plus'></i>
        </button>
    )
}

export default FabAddNew
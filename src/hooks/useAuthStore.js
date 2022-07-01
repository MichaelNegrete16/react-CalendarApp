import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"
import { onLogoutCalendar } from "../store/calendar/calendarSlice"

export const useAuthStore = () => {
    
    const {status,user,errrorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const startLogin = async ({email,password}) => {
        // Verificar credenciales
        dispatch(onChecking())   

        try {

            const {data} = await calendarApi.post('/auth',{email,password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'))
            setTimeout(() => {
                // Limpiar el mensaje de error
                dispatch(clearErrorMessage())
            }, 10);
        }

    }


    const startRegistro = async ({name,email,password}) => {
        // Verificar credenciales
        dispatch(onChecking())

        try {
            const {data} = await calendarApi.post('/auth/new',{name,email,password})
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())

            dispatch(onLogin({name: data.name, uid: data.uid}))

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || '--'))
            // Limpiar mensaje de error
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);
        }
    }

// renovar el token si expira
    const checkAuthToken = async () =>{
        const token = localStorage.getItem('token')
        if(!token) return dispatch(onLogout())

        try {
            const {data} = await calendarApi.get('/auth/renew')
            localStorage.setItem('token', data.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(onLogin({name: data.name, uid: data.uid}))
        } catch (error) {
            // Limpiart localStorage
            localStorage.clear()
            dispatch(onLogout())
        }

    }

    const startLogout = () => {
        localStorage.clear()
        dispatch(onLogoutCalendar())
        dispatch(onLogout())
    }

    return {
        //* Propiedades
        status,
        user,
        errrorMessage,
        //* Metodos
        startLogin,
        startRegistro,
        checkAuthToken,
        startLogout
    }
}
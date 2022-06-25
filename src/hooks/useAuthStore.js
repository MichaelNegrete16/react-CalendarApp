import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice"

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

    return {
        //* Propiedades
        status,
        user,
        errrorMessage,
        //* Metodos
        startLogin,
    }
}
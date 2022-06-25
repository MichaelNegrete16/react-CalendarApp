import LoginPage from '../auth/pages/LoginPage'
import CaledarPage from '../calendar/pages/CaledarPage'

import { Routes, Route, Navigate } from 'react-router-dom'

// Hooks
import { useAuthStore } from '../hooks/useAuthStore'
import { useEffect } from 'react'

const AppRouter = () => {
  
    // const authStatus = 'not-authenticated' //'not-authenticated'
    const {status,checkAuthToken} = useAuthStore()

    useEffect(() => {
      checkAuthToken()
    }, [])
    

    if(status === 'checking'){
        return(
            <h3>Cargando...</h3>
        )
    }

    return (
        <Routes>
            { 
                (status === 'not-authenticated')
                 ? <Route path='/auth/*' element={<LoginPage/>}/>
                 : <Route path='/*' element={<CaledarPage/>}/> 
            }

            <Route path='/*' element={<Navigate to='/auth/login'/>} />
        </Routes>
    )
}

export default AppRouter
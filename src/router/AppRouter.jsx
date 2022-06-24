import LoginPage from '../auth/pages/LoginPage'
import CaledarPage from '../calendar/pages/CaledarPage'

import { Routes, Route, Navigate } from 'react-router-dom'

const AppRouter = () => {
  
    const authStatus = 'not-authenticated' //'not-authenticated'

    return (
        <Routes>
            { 
                (authStatus === 'not-authenticated')
                 ? <Route path='/auth/*' element={<LoginPage/>}/>
                 : <Route path='/*' element={<CaledarPage/>}/> 
            }

            <Route path='/*' element={<Navigate to='/auth/login'/>} />
        </Routes>
    )
}

export default AppRouter
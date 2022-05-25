import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import LoginScreen from "../auth/LoginScreen"
import CalendarScreen from "../calendar/CalendarScreen"

const AppRouter = () => {
  return (
    <BrowserRouter>

        <Routes>
            <Route exact path="/login" element={<LoginScreen/>} />
            <Route exact path="/" element={<CalendarScreen/>} />
            {/* Si la ruta no se encuentra redirije a el / */}
            <Route path="*" element={<Navigate replace to='/'/>}/>
        </Routes>

    </BrowserRouter>
  )
}

export default AppRouter
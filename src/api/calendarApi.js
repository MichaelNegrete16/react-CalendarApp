import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const {VITE_API_URL} = getEnvVariables()

const calendarApi = axios.create({
    baseURL: VITE_API_URL
})

// Todo: Configurar interceptores
// Interceptar peticiones que van o regresan del backend
calendarApi.interceptors.request.use(config => {
    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    return config
})

export default calendarApi
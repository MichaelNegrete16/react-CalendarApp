
// Obtener las variables de entorno, Solo funciona en vite
export const getEnvVariables = () => {
    
    import.meta.env

    return {
        ...import.meta.env
    }
}
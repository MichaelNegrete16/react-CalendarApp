// Hooks
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useform';

// Hoja de esitlos
import './loginPage.css';
// Alertas
import Swal from 'sweetalert2';

const loginFormField = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormField = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

const LoginPage = () => {

    const {startLogin, errrorMessage, startRegistro} = useAuthStore()

    const  {loginEmail,loginPassword,onInputChange: onLoginInputChange} = useForm(loginFormField)
    const  {registerName,registerEmail,registerPassword,registerPassword2, onInputChange: onRegisterChange} = useForm(registerFormField)

    const loginSubmit = (e) => {
        e.preventDefault()
        startLogin({ email: loginEmail , password: loginPassword })
    }

    const registerSubmit = (e) => {
        e.preventDefault()
        // Verificar que las contraseñas sena iguales
        if(registerPassword !== registerPassword2){
            Swal.fire('Error en la autenticacion','Las contraseñas deben ser iguales','error')
            return
        }

        startRegistro({ name:registerName, email:registerEmail, password:registerPassword })
    }

    useEffect(() => {
        if(errrorMessage !== undefined){
            Swal.fire('Error en la autenticacion', errrorMessage, 'error')
        }
    }, [errrorMessage])
    

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>

                    {/* Formulario del login */}

                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>
                
                {/* Formulario de registro */}

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default LoginPage
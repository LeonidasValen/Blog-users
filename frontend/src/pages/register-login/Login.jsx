import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useUser } from '../../context/authContext'

export function Login({logo}) {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate()
  axios.defaults.withCredentials = true;
  const { loginUser } = useUser();

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData({...formData, [name]: value})
    setErrors({...errors, [name]: ''}); // Limpiar el error cuando el usuario comienza a escribir
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()

    //validacion de campos
    const errors = {};
    if(!formData.email){
      errors.email = 'El correo electrónico es obligatorio'
    }
    if(!formData.password){
      errors.password = 'El contraseña es obligatorio'
    }
    if(formData.password.length < 6){
      errors.password = 'La contraseña debe tener al menos 6 caracteres'
    }
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailFormat.test(formData.email)){
      errors.email = 'Ingrese un correo electrónico válido'
    }

    // Si hay errores, mostrarlos y detener el envío del formulario
    if (Object.keys(errors).length > 0) {
        setErrors(errors);
        return;
    }

    try {
      await loginUser(formData);
      //console.log('Respuesta del servidor:', res.data);
      //const res = await axios.post(`http://localhost:8000/api/user/login`, formData);
      navigate('/')
      
    } catch (error) {
      console.error('Error al iniciar sesion del usuario', error.message);
      if (error.response) {
        setErrors({ form: 'Error al conectarse con el servidor.'});
      }
    }
  }

    return (
      <section className="auth login">
        <section className="block1">
        <div className="block1-container">
          <div className="logo"><img src={logo} alt="" /></div>
          <span>
          ¡Bienvenido de vuelta! <br /><br />
          Inicia sesión para acceder a todo el contenido exclusivo y disfrutar de una experiencia personalizada en nuestro sitio de noticias. ¿Listo para mantenerte al día con las últimas noticias?
          </span>
          <div className="img-vector"><img src="./icons/write.png" alt="" /></div>
        </div>
      </section>
      <section className='block2'>
        <h1>Inicio de sesion</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Correo</label>
          <input type="text" placeholder='Correo' id='email'
           autoComplete='email'
          name="email"
          onChange={handleChange}/>
          {errors.email && <p className="field-error">{errors.email}</p>}
          <label htmlFor="password">Contraseña</label>
          <input type="password" placeholder='Contraseña' id='password'
          name="password"
          onChange={handleChange}/>
          {errors.password && <p className="field-error">{errors.password}</p>}
          <button>Iniciar secion</button>
        </form>
          <span className="noaccount">No tienes cuenta? <Link to="/register">Registrate</Link></span>
          {errors.form && <p className="field-error">{errors.form}</p>}
        </section>
      </section>
    )
  }
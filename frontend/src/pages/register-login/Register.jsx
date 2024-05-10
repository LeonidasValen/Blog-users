import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'

import './Regis-login.css'

export function Register({logo}) {
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const navigate = useNavigate()

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
    if(!formData.name){
      errors.name = 'El nombre es obligatorio'
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
      const res = await axios.post(`api/user/register`, formData)
      // console.log('Respuesta del servidor:', res.data);
      navigate('/login')
    } catch (error) {
      //console.error('Error al registrar usuario:', error);
      console.error('Error al registrar usuario');
      if (error.response && error.response.data) {
          const errorMessage = error.response.data.error; // Corrección aquí
          if (errorMessage === 'El Correo o el Nombre del usuario ya esta registrado') {
              setErrors({ email: 'El Correo o el Nombre del usuario ya esta registrado' });
          } else {
              setErrors({ form: 'Error al registrar usuario. Inténtelo de nuevo.' });
          }
      } else {
          // Si no hay un error específico del backend
          setErrors({ form: 'Error al conectarse con el servidor.' });
          console.error('Error al registrar usuario');
      } 
    }
  }

  return (
    <section className="auth">
      <section className="block1">
        <div className="block1-container">
          <div className="logo"><img src={logo} alt="" /></div>
          <span>
            ¡Bienvenido al sitio de noticias del momento! 📰🎉<br /><br />
           !Registrarte para recibir actualizaciones sobre las noticias más relevantes y participar en nuestra comunidad comentando y compartiendo tus opiniones.
            ¡Gracias por unirte a nosotros!
          </span>
          <div className="img-vector"><img src="./icons/write.png" alt="" /></div>
        </div>
      </section>
      <section className="block2">
        <h1>Registro</h1>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Nombre</label>
          <input type="text" placeholder='Nombre'
          name="name"
          onChange={handleChange}/>
          {errors.name && <p className="field-error">{errors.name}</p>}
          <label htmlFor="email">Correo</label>
          <input type="text" placeholder='Correo'
          name="email"
          onChange={handleChange}/>
          {errors.email && <p className="field-error">{errors.email}</p>}
          <label htmlFor="password">Contraseña</label>
          <input type="password" placeholder='Contraseña'
          name="password"
          onChange={handleChange}/>
        {errors.password && <p className="field-error">{errors.password}</p>}
          <button>Registrate</button>
        </form>

        <span className="noaccount">tenes cuenta? <Link to="/login">Iniciar sesión</Link></span>
          {errors.form && <p className="field-error">{errors.form}</p>}
      </section>
    </section>
  )
}
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Assets/RegistrarCarabineros.css';

const RegistrarCarabinero = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    edad: '',
    grado: '',
    unidad: '',
    fechaNacimiento: '',
    comisaria: '',
    contraseña: '',
    repetirContraseña: '',
  });

  const [registroExitoso, setRegistroExitoso] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3002/api/carabineros/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Registro exitoso
        setRegistroExitoso(true);
        alert('Carabinero registrado con éxito'); // Muestra un alert
        // Ejemplo: history.push('/login');
      } else {
        // Manejar los errores de respuesta del servidor
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor', error);
    }
  };

  return (
    <div className="Registro-card-container">
      <div className="Registro-card">
        <h2>Registro de Carabineros</h2>
        
        {registroExitoso && (
          <div className="Registro-exito">
            ¡Registro exitoso! Puede iniciar sesión ahora.
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="Registro-formGroup">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Apellido:</label>
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              name="correo"
              placeholder="Correo Electrónico"
              value={formData.correo}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Edad:</label>
            <input
              type="text"
              name="edad"
              placeholder="Edad"
              value={formData.edad}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Grado:</label>
            <input
              type="text"
              name="grado"
              placeholder="Grado"
              value={formData.grado}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Unidad:</label>
            <input
              type="text"
              name="unidad"
              placeholder="Unidad"
              value={formData.unidad}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Comisaría:</label>
            <input
              type="text"
              name="comisaria"
              placeholder="Comisaría"
              value={formData.comisaria}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Contraseña:</label>
            <input
              type="password"
              name="contraseña"
              placeholder="Contraseña"
              value={formData.contraseña}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <div className="Registro-formGroup">
            <label>Repetir Contraseña:</label>
            <input
              type="password"
              name="repetirContraseña"
              placeholder="Repetir Contraseña"
              value={formData.repetirContraseña}
              onChange={handleChange}
              className="Registro-input"
            />
          </div>
          <button type="submit" className="Registro-button" >
          Registrarse
        </button>
        </form>
        <Link to="/login" className="Registro-Link">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </div>
  );
};

export default RegistrarCarabinero;

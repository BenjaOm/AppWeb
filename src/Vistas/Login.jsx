import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Assets/Login.css';
import RegistrarCarabinero from './RegistrarCarabinero';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credential, setCredential] = useState('');
  const [error, setError] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Estado para controlar la visibilidad del modal de registro

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:3002/api/login', {
        correo: email,
        contraseña: password,
      });
  
      // La respuesta debe contener el token JWT
      const { token } = response.data;
  
      // Almacena el token en el almacenamiento local (o en una cookie) para su uso posterior
      localStorage.setItem('token', token);
  
      // Redirige al usuario a la página de mapa después de iniciar sesión
      navigate('/mapa');
    } catch (error) {
      // Manejo de errores, puedes establecer el estado de "error" aquí
      console.error('Error al iniciar sesión:', error);
    }
  };

  const handleOpenRegisterModal = () => {
    navigate('/registroCarabinero');

  };

  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="formGroup">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className="inputField"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>Contraseña:</label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="inputField"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="formGroup">
            <label>Número de Credencial:</label>
            <input
              type="text"
              placeholder="Número de credencial"
              className="inputField"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="checkboxGroup">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Recordarme</label>
          </div>
          <div class="button-container">
            <button type="submit" className="button">
              Ingresar
            </button>
       
            <button
              type="button"
              className="button"
              onClick={handleOpenRegisterModal}
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

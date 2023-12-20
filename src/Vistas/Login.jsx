import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useHistory

const Login = () => {
  const [showModal, setShowModal] = useState(true); // Modal shown by default
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [credential, setCredential] = useState('');
  const [error, setError] = useState('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const navigate = useNavigate(); // Crea una instancia de useNavigate

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar tu lógica de validación de inicio de sesión
    navigate('/mapa'); // Redirecciona a Mapa.jsx
  };

  return (
    <div>
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span style={styles.closeButton} onClick={toggleModal}>&times;</span>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
              <div style={styles.formGroup}>
                <label>Correo Electrónico:</label>
                <input
                  type="email"
                  placeholder="Ingresa tu correo"
                  style={styles.inputField}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Contraseña:</label>
                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  style={styles.inputField}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Número de Credencial:</label>
                <input
                  type="text"
                  placeholder="Número de credencial"
                  style={styles.inputField}
                  value={credential}
                  onChange={(e) => setCredential(e.target.value)}
                />
              </div>
              {error && <div style={{ color: 'red' }}>{error}</div>}
              <div style={styles.checkboxGroup}>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Recordarme</label>
              </div>
              <div style={styles.formGroup}>
                <button type="submit" style={styles.button}>Ingresar</button>
              </div>
              <div style={styles.formGroup}>
                <button type="button" style={styles.button}>Registrarse</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
// Inline CSS styles
const styles = {
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '500px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '28px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  formGroup: {
    marginBottom: '15px',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: 'darkgreen',
    color: 'white',
    cursor: 'pointer',
  }
};

export default Login;

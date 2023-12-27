// ModalTodosLosDelitos.js
import React from 'react';
import '../Assets/ModalTodosLosDelitos.css';

const ModalTodosLosDelitos = ({ isVisible, onClose, details }) => {
  return (
    <div className={`modal-todos-los-delitos ${isVisible ? 'active' : ''}`}>
      <div className={`modal-todos-los-delitos-content ${isVisible ? 'active' : ''}`}>
        <h2>Detalles de Todos los Delitos</h2>
        {/* Verifica si 'details' es un array antes de usar 'map' */}
        <div className="details-container">
          {Array.isArray(details) && details.length > 0 ? (
            <ul>
              {details.map((detail) => (
                <li key={detail.id}>
                  <strong>Descripción:</strong> {detail.description}
                  <br />
                  <strong>Fecha:</strong> {detail.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay detalles disponibles</p>
          )}
        </div>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalTodosLosDelitos;

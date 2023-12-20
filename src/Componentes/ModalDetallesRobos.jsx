// RobberyDetailsModal.js
import React from 'react';
import '../Assets/ModalDetalleRobos.css';

const RobberyDetailsModal = ({ isVisible, onClose, details }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="robbery-details-modal">
      <div className="robbery-details-modal-content">
        <h2>Detalles del Robo</h2>
        <ul>
          {details.map((robbery) => (
            <li key={robbery.id}>
              <h3>{robbery.description}</h3>
              <p>Fecha: {robbery.date}</p>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default RobberyDetailsModal;

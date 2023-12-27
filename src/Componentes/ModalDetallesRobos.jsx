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
          {details.map((robbery, index) => (
            <li key={index}>
              <h3>{robbery.descripcion}</h3>
              <p>Fecha: {new Date(robbery.fecha).toLocaleDateString()}</p>
              <p>Dirección: {robbery.direccion}</p>
              <p>Información Adicional: {robbery.infoAdicional}</p>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default RobberyDetailsModal;

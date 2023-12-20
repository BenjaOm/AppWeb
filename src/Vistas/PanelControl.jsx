import React, { useState } from 'react';
import '../Assets/PanelControl.css'; // Importa el nuevo CSS

const PanelControl = () => {
  const denuncias = [
    { 
      IDDenuncia: '001', 
      usuario: { nombre: 'Juan' }, 
      descripcion: 'Descripción breve 1', 
      tipoDelito: 'Robo', 
      informacionAdicional: 'Sin heridos', 
      descripcionIncidente: 'Robo en tienda de electrónicos', 
      direccion: 'Calle Falsa 123', 
      ubicacion: { latitud: -34.603722, longitud: -58.381592 }
    },
    { 
      IDDenuncia: '002', 
      usuario: { nombre: 'Ana' }, 
      descripcion: 'Descripción breve 2', 
      tipoDelito: 'Vandalismo', 
      informacionAdicional: 'Daños a la propiedad', 
      descripcionIncidente: 'Grafiti en paredes de escuela', 
      direccion: 'Avenida Siempre Viva 742', 
      ubicacion: { latitud: -34.615852, longitud: -58.433297 }
    },
  ];

  const [selectedDenuncia, setSelectedDenuncia] = useState(null);

  const openModal = (denuncia) => {
    setSelectedDenuncia(denuncia);
  };

  const closeModal = () => {
    setSelectedDenuncia(null);
  };

  return (
    <div className="panel-control">
    <h1>Panel de Control</h1>
    <div className="notification-list">
      {denuncias.map((denuncia, index) => (
        <div key={index} className="notification-card" onClick={() => openModal(denuncia)}>
          <h3>ID Denuncia: {denuncia.IDDenuncia}</h3>
          <p>Usuario: {denuncia.usuario && denuncia.usuario.nombre}</p>
          <p>Descripción Breve: {denuncia.descripcion}</p>
          {/* Additional fields can be displayed in the card as needed */}
        </div>
      ))}
    </div>

    {selectedDenuncia && (
      <div className="modal-panel" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>ID Denuncia: {selectedDenuncia.IDDenuncia}</h2>
          <p>Fecha: {/* Insertar fecha aquí si está disponible */}</p>
          <p>Usuario: {selectedDenuncia.usuario && selectedDenuncia.usuario.nombre}</p>
          <p>Descripción Breve: {selectedDenuncia.descripcion}</p>
          <p>Tipo de Delito: {selectedDenuncia.tipoDelito}</p>
          <p>Información Adicional: {selectedDenuncia.informacionAdicional}</p>
          <p>Descripción del Incidente: {selectedDenuncia.descripcionIncidente}</p>
          <p>Dirección: {selectedDenuncia.direccion}</p>
          <p>Ubicación: {selectedDenuncia.ubicacion ? `${selectedDenuncia.ubicacion.latitud}, ${selectedDenuncia.ubicacion.longitud}` : 'No disponible'}</p>
          <div className="modal-actions">
            <button className="approve-button">Aprobar</button>
            <button className="reject-button">Rechazar</button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default PanelControl;

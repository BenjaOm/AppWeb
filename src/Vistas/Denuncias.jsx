import React from 'react';
import styles from '../Assets/Denuncias.css'; // Import CSS module

const Denuncias = () => {
  // Sample data for the table
  const denunciasData = [
    { id: '001', usuario: 'Juan', tipoDelito: 'Robo', estado: 'Revisión', descripcion: 'Robo en tienda' },
    { id: '002', usuario: 'Ana', tipoDelito: 'Vandalismo', estado: 'Aprobado', descripcion: 'Grafiti en escuela' },
    { id: '003', usuario: 'Carlos', tipoDelito: 'Fraude', estado: 'Rechazado', descripcion: 'Fraude online' },
    { id: '004', usuario: 'Luisa', tipoDelito: 'Hurtos', estado: 'No válido', descripcion: 'Hurtos menores' },
    { id: '005', usuario: 'Sofía', tipoDelito: 'Daños', estado: 'Revisión', descripcion: 'Daños en parque' },
    // ... more data
  ];

  return (
    <div className="container">
   <h1>Denuncias</h1>
   <table className="denunciasTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Tipo de Delito</th>
            <th>Estado</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {denunciasData.map((denuncia, index) => (
            <tr key={index}>
              <td>{denuncia.id}</td>
              <td>{denuncia.usuario}</td>
              <td>{denuncia.tipoDelito}</td>
              <td>{denuncia.estado}</td>
              <td>{denuncia.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Denuncias;

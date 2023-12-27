// DenunciasValidadas.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../Assets/Denuncias.css';

const DenunciasValidadas = () => {
  const [denunciasValidadas, setDenunciasValidadas] = useState([]);

  useEffect(() => {
    const fetchDenuncias = async () => {
      try {
        const response = await axios.get('http://localhost:3002/api/denuncias-validadas');
        setDenunciasValidadas(response.data);
      } catch (error) {
        console.error('Error al obtener las denuncias validadas', error);
      }
    };

    fetchDenuncias();
  }, []);

  console.log(denunciasValidadas);

  return (
    <div className={styles.container}>
      <h1>Denuncias Validadas</h1>
      <table className="denunciasTable">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Descripción</th>
            <th>Tipo de Delito</th>
            <th>Información Adicional</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Carabinero Asignado</th> {/* Agrega esta columna */}
          </tr>
        </thead>
        <tbody>
          {denunciasValidadas.map((denunciaValidada, index) => (
            <tr key={index}>
              <td>{denunciaValidada.nombre}</td>
              <td>{denunciaValidada.direccion}</td>
              <td>{denunciaValidada.descripcion}</td>
              <td>{denunciaValidada.tipoDelitoSeleccionado}</td>
              <td>{denunciaValidada.infoAdicional}</td>
              <td>{new Date(denunciaValidada.fecha).toLocaleString()}</td>
              <td>{denunciaValidada.estado}</td>
        <td>{denunciaValidada.carabineroAsignado ? denunciaValidada.carabineroAsignado.nombre : 'No asignado'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DenunciasValidadas;

import React, { useState, useEffect } from 'react';
import '../Assets/PanelControl.css';

const PanelControl = () => {
  const [denuncias, setDenuncias] = useState([]);
  const [carabineros, setCarabineros] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [denunciaSeleccionada, setDenunciaSeleccionada] = useState(null);
  const [carabineroSeleccionado, setCarabineroSeleccionado] = useState('');

  useEffect(() => {
    const cargarDenuncias = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/denuncias');
        if (!response.ok) {
          throw new Error('Error al cargar las denuncias');
        }
        const data = await response.json();
        setDenuncias(data);
      } catch (error) {
        console.error('Error al cargar las denuncias:', error);
      }
    };

    const cargarCarabineros = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/carabineros/nombres');
        if (!response.ok) {
          throw new Error('Error al cargar los nombres de los carabineros');
        }
        const nombres = await response.json();
        setCarabineros(nombres);
      } catch (error) {
        console.error('Error al cargar los nombres de los carabineros:', error);
      }
    };

    cargarDenuncias();
    cargarCarabineros();
  }, []);

  const abrirModal = (denuncia) => {
    setDenunciaSeleccionada(denuncia);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setDenunciaSeleccionada(null);
  };

  const handleAprobacion = async () => {
    if (carabineroSeleccionado) {
      const estado = 'aprobado';
      const carabineroSeleccionadoID = carabineroSeleccionado;
      enviarValidacion(estado, carabineroSeleccionadoID);
    } else {
      console.error('Debes seleccionar un carabinero antes de aprobar.');
    }
  };

  const handleRechazo = async () => {
    const estado = 'rechazado';
    enviarValidacion(estado);
  };

  const enviarValidacion = async (estado, carabineroID) => {
    try {
      const response = await fetch('http://localhost:3002/api/denuncias-validadas/validar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...denunciaSeleccionada,
          estado,
          carabineroSeleccionado: carabineroID,
        }),
      });
  
      if (response.ok) {
        // Elimina la denuncia validada del estado local
        const updatedDenuncias = denuncias.filter((denuncia) => denuncia._id !== denunciaSeleccionada._id);
        setDenuncias(updatedDenuncias);
        console.log('Denuncia validada correctamente');
      } else {
        throw new Error('Error al validar la denuncia');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
    cerrarModal();
  };



  return (
    <div className="panel-control">
      <h1>Panel de Control</h1>
      <table>
        <thead>
          <tr>
            <th>Tipo</th>

            <th>Descripción</th>
            <th>Fecha</th>
            <th>Información adicional</th>

            <th>Asignar Estado</th>
          </tr>
        </thead>
      <tbody>
        {denuncias.map((denuncia) => (
          <tr key={denuncia.id}>
            <td>{denuncia.tipoDelitoSeleccionado}</td>
            <td>{denuncia.descripcion}</td>
            <td>{denuncia.fecha}</td>
            <td>{denuncia.infoAdicional}</td>
            <td>
              <button onClick={() => abrirModal(denuncia)}>Validación</button>
            </td>
          </tr>
        ))}
      </tbody>

      </table>

      {modalVisible && (
  <div className="modal-panel-control">
    <div className="modal-content">
      <span className="close" onClick={cerrarModal}>&times;</span>
      <h2>Detalle de Denuncia</h2>
      <p><strong>Nombre:</strong> {denunciaSeleccionada.nombre}</p>
      <p><strong>Dirección:</strong> {denunciaSeleccionada.direccion}</p>
      <p><strong>Tipo de Delito:</strong> {denunciaSeleccionada.tipoDelitoSeleccionado}</p>
      <p><strong>Descripción:</strong> {denunciaSeleccionada.descripcion}</p>
      <p><strong>Información Adicional:</strong> {denunciaSeleccionada.infoAdicional}</p>
      <p><strong>Fecha:</strong> {new Date(denunciaSeleccionada.fecha).toLocaleDateString()}</p>
      <div>
      <label htmlFor="carabinero">Asignar a Carabinero/Unidad: </label>
           <select
          name="carabinero"
          id="carabinero"
          value={carabineroSeleccionado}
          onChange={(e) => setCarabineroSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un Carabinero/Unidad</option>
          {carabineros.map((carabinero) => {
            console.log('Nombre del carabinero:', carabinero.nombre);
            console.log('Unidad del carabinero:', carabinero.unidad);
            return (
              <option key={carabinero._id} value={carabinero._id}>
                {carabinero.nombre} ({carabinero.unidad})
              </option>
            );
          })}
        </select>

        <div className="modal-buttons">
        <button className="btn-approve" onClick={handleAprobacion}>Aprobar</button>
        <button className="btn-reject" onClick={handleRechazo}>Rechazar</button>
      </div>

      </div>
    </div>
  </div>
)}

    </div>
  )
}

export default PanelControl;

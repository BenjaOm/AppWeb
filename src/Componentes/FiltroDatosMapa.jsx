import React, { useState, useEffect } from 'react';
import '../Assets/FiltroDatosMapa.css';
import axios from 'axios'; // Asegúrate de importar Axios al principio de tu archivo

const FiltroDatosMapa = ({ isVisible, onClose, onFilter }) => {

  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarTablaPromedio, setMostrarTablaPromedio] = useState(false);
  const [mostrarTablaDetenidos, setMostrarTablaDetenidos] = useState(false);
  const [mostrarTablaDetenciones, setMostrarTablaDetenciones] = useState(false);
  const [mostrarTablaCasos, setMostrarTablaCasos] = useState(false);
  const [mostrarTablaPorcentajeVariacion, setMostrarTablaPorcentajeVariacion] = useState(false);
  const [seConsulto, setSeConsulto] = useState(false);
  const [tablaActual, setTablaActual] = useState("Promedio");
  const [haSidoConsultado, setHaSidoConsultado] = useState(false);

  const [datosCasos, setDatosCasos] = useState([]);

  const [resultados, setResultados] = useState([]);
  const [filtroSemana, setFiltroSemana] = useState(''); // Estado para el filtro de semana

  const [ultimasSemanasDiciembre, setUltimasSemanasDiciembre] = useState([]);


  const obtenerUltimasSemanasDiciembre = () => {
    const fechaActual = new Date();
    const ultimoDiaDiciembre = new Date(fechaActual.getFullYear(), 11, 31);
    const semanasDiciembre = [];

    for (let i = 2; i >= 0; i--) {
      const fechaInicioSemana = new Date(ultimoDiaDiciembre);
      fechaInicioSemana.setDate(ultimoDiaDiciembre.getDate() - i * 7);
      const semana = `Semana ${i + 1} - ${fechaInicioSemana.getDate()} de diciembre`;
      semanasDiciembre.push(semana);
    }

    setUltimasSemanasDiciembre(semanasDiciembre);
  };


  useEffect(() => {
    obtenerUltimasSemanasDiciembre();
  }, []);

  const obtenerConteoAnual = async (año) => {
    try {
      const response = await axios.get(`http://localhost:3002/api/denuncias/conteo-anual/${año}`);
      return response.data.conteo;
    } catch (error) {
      console.error('Error al obtener el conteo anual de denuncias:', error);
      return 0;
    }
  };

  const actualizarDatosCasos = async () => {
    // Obtener el total de denuncias para el año 2023
    const conteo2023 = await obtenerConteoAnual(2023);

    // Crear un objeto de datos solo para el año 2023 sin fecha ni año
    const datos2023 = { categoria: 'Denuncias', '2023': conteo2023 };

    if (filtroSemana) {
      const responseSemana = await axios.get(`http://localhost:3002/api/denuncias/semana-actual/${encodeURIComponent(filtroSemana)}`);
      datos2023['conteo_semana'] = responseSemana.data.conteo;
    }

    // Actualizar los datos
    setDatosCasos([datos2023]);
  };
  useEffect(() => {
    actualizarDatosCasos();
  }, [filtroSemana]);

useEffect(() => {
    obtenerConteoAnual(2023).then(conteo2023 => {
        setDatosCasos([{ categoria: 'Denuncias', '2023': conteo2023 }]);
    });
}, []); // Se ejecuta solo una vez al montar el componente






  
  const manejarClicOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible) {
    return null;
  }


  const manejarLimpiar = () => {
    setResultados([]);
    setMostrarResultados(false);
  };

  const manejarBotonClic = (nombreBoton) => {
    // Lógica para manejar el clic en el botón
    console.log('Botón ' + nombreBoton + ' presionado');
    // Aquí puedes implementar la lógica o llamar a una función dependiendo del botón presionado
  };

  const datosSimulados = [
    { categoria: 'Robos', '2020': 120, '2021': 110, '2022': 90, '2023': 100, promedio: 105 },
    { categoria: 'Homicidios', '2020': 30, '2021': 25, '2022': 27, '2023': 29, promedio: 27.75 },
    { categoria: 'Violaciones', '2020': 60, '2021': 45, '2022': 50, '2023': 55, promedio: 52.5 },
    { categoria: 'Lesiones', '2020': 200, '2021': 180, '2022': 190, '2023': 210, promedio: 195 },
    { categoria: 'Hurtos', '2020': 300, '2021': 320, '2022': 310, '2023': 305, promedio: 308.75 }
  ];

  const datosDetenidos = [
    { categoria: 'Homicidios', '2022_semana': 5, '2023_semana': 4, 'variacion_semana': '-20%', '2022_mes': 20, '2023_mes': 18, 'variacion_mes': '-10%', '2022_fecha': 100, '2023_fecha': 90, 'variacion_fecha': '-10%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },
    { categoria: 'Violaciones', '2022_semana': 3, '2023_semana': 2, 'variacion_semana': '-33%', '2022_mes': 12, '2023_mes': 10, 'variacion_mes': '-16.7%', '2022_fecha': 48, '2023_fecha': 40, 'variacion_fecha': '-16.7%' },

  
    // ...otros datos...
  ];

  const manejarMostrarTablaPromedio = () => {
    setHaSidoConsultado(true); // Marcar como consultado
    setMostrarTablaPromedio(true);
    setMostrarTablaDetenidos(false); // Ocultar la tabla de Detenidos
    setMostrarTablaDetenciones(false)
    setMostrarTablaCasos(false);


  };
  const manejarMostrarTablaDetenidos = () => {
    setHaSidoConsultado(true); // Marcar como consultado
    setMostrarTablaPromedio(false); // Ocultar la tabla de Promedio
    setMostrarTablaDetenidos(true);
    setMostrarTablaDetenciones(false)
    setMostrarTablaCasos(false);

  };
  const manejarMostrarDetenciones = () => {
    setMostrarTablaDetenciones(true);
    setMostrarTablaPromedio(false); // Ocultar la tabla de Promedio
    setMostrarTablaDetenidos(false);
    setHaSidoConsultado(true); // Marcar como consultado
    setMostrarTablaCasos(false);


  }
  const manejarMostrarCasos = () => {
    setMostrarTablaCasos(true);
    setMostrarTablaDetenciones(false);
    setMostrarTablaPromedio(false); // Ocultar la tabla de Promedio
    setMostrarTablaDetenidos(false);
    setHaSidoConsultado(true); // Marcar como consultado
  }
  const manejarMostrarPorcentajeVariacion = () => {
    setMostrarTablaPromedio(true);
  }

  return (
    <div className="modal-overlay" onClick={manejarClicOverlay}>
    <div className="modal">
      <div className="modal-header">
        <h2>Datos</h2>
        <button className="close-btn" onClick={onClose}>
          <i className="material-icons">close</i>
        </button>
      </div>
      <div className="modal-body">
      <div className="filters-container">
          <div className="filter-group" key="semana">
            <label htmlFor="semana">Semana:</label>
            <select
            value={filtroSemana}
            onChange={(e) => setFiltroSemana(e.target.value)}
          >
            <option value="">Selecciona una semana</option>
            {ultimasSemanasDiciembre.map((semana, index) => (
              <option key={index} value={semana}>{semana}</option>
            ))}
          </select>
            </div>
            <div className="filter-group" key="zona">
              <label htmlFor="zona">Zona:</label>
              <select id="zona">
                <option value="">Selecciona una opción</option>
                <option value="opcion1">Opción 1 Mes</option>
                <option value="opcion2">Opción 2 Mes</option>
                <option value="opcion3">Opción 3 Mes</option>
              </select>
            </div>
            <div className="filter-group" key="unidad">
              <label htmlFor="unidad">Unidad:</label>
              <select id="unidad">
                <option value="">Selecciona una opción</option>
                <option value="opcion1">Opción 1 Unidad</option>
                <option value="opcion2">Opción 2 Unidad</option>
                <option value="opcion3">Opción 3 Unidad</option>
              </select>
            </div>
            
            <div className="filter-group" key="provincia">
              <label htmlFor="provincia">Provincia:</label>
              <select id="provincia">
                <option value="">Selecciona una opción</option>
                <option value="opcion1">Opción 1 Unidad</option>
                <option value="opcion2">Opción 2 Unidad</option>
                <option value="opcion3">Opción 3 Unidad</option>
              </select>
            </div>
            <div className="filter-group" key="comisaria">
              <label htmlFor="comisaria">Comisaria:</label>
              <select id="comisaria">
                <option value="">Selecciona una opción</option>
                <option value="opcion1">Opción 1 Unidad</option>
                <option value="opcion2">Opción 2 Unidad</option>
                <option value="opcion3">Opción 3 Unidad</option>
              </select>
            </div>

            <div className="filter-group" key="cuadrante">
              <label htmlFor="cuadrante">Cuadrante:</label>
              <select id="cuadrante">
                <option value="">Selecciona una opción</option>
                <option value="opcion1">Opción 1 Unidad</option>
                <option value="opcion2">Opción 2 Unidad</option>
                <option value="opcion3">Opción 3 Unidad</option>
              </select>
            </div>
       
            
            {/* Agrega el resto de los select de la misma manera */}
          </div>
        </div>
        <div className="modal-footer">
        <button className="btn" onClick={actualizarDatosCasos}>Consultar</button>
        <button className="btn btn-secondary" onClick={manejarLimpiar}>Limpiar</button>
      </div>

        <div className="modal-footer">
          <button className="btn" onClick={() => manejarMostrarCasos('Casos de delitos')}>Casos de delitos</button>
          <button className="btn" onClick={() => manejarMostrarDetenciones('Detenciones')}>Detenciones</button>
          <button className="btn" onClick={manejarMostrarTablaDetenidos}>Consultar Detenidos</button>
          <button className="btn" onClick={() => manejarMostrarTablaPromedio('Promedio')}>Promedio</button>
        </div>

        {haSidoConsultado && (
          <div className="modal-table-container">
            {mostrarTablaCasos && (
              <div className="casos-table">
                <table>
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th>Última semana</th>
                      <th>2023</th>
                      <th>Variación %</th>
                      <th>Último mes</th>
                  
                    </tr>
                  </thead>
                    <tbody>
            {datosCasos.map((row, index) => (
              <tr key={index}>
                <td>{row.categoria}</td>
                <td>{row['conteo_semana']}</td>
                <td>{row['2023']}</td>
                <td>{row['2023']}</td>

                {/* ... otros datos de la fila ... */}
              </tr>
            ))}
          </tbody>
                </table>
              </div>
            )}

            {mostrarTablaPromedio && (
              <div className="average-table">
                <table>
                  <thead>
                    <tr>
                      <th>Rangos</th>
                      <th>2020</th>
                      <th>2021</th>
                      <th>2022</th>
                      <th>2023</th>
                      <th>Promedio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosSimulados.map((data, index) => (
                      <tr key={index}>
                        <td>{data.categoria}</td>
                        <td>{data['2020']}</td>
                        <td>{data['2021']}</td>
                        <td>{data['2022']}</td>
                        <td>{data['2023']}</td>
                        <td>{data.promedio}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {mostrarTablaDetenidos && (
              <div className="detenidos-table">
                <table>
                  <thead>
                    <tr>
                      <th rowSpan="2">Detenidos</th>
                      <th colSpan="4">Última semana</th>
                      <th colSpan="2">Último mes</th>
                      <th colSpan="2">A la Fecha </th>
                    </tr>
                    <tr>
                      {/* Sub-encabezados para 'Última semana' */}
                      <th>2022</th>
                      <th>2023</th>
                      <th>Variación %</th>
                      {/* Sub-encabezados para 'Último mes' y 'A la fecha actual' */}
                      <th>2022</th>
                      <th>2023</th>
                      <th>Variación %</th>
                      <th>2022</th>
                      <th>2023</th>
                      <th>Variación %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosDetenidos.map((row, index) => (
                      <tr key={index}>
                        <td>{row.categoria}</td>
                        <td>{row['2022_semana']}</td>
                        <td>{row['2023_semana']}</td>
                        <td>{row['variacion_semana']}</td>
                        <td>{row['2022_mes']}</td>
                        <td>{row['2023_mes']}</td>
                        <td>{row['variacion_mes']}</td>
                        <td>{row['2022_fecha']}</td>
                        <td>{row['2023_fecha']}</td>
                        <td>{row['variacion_fecha']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {mostrarTablaDetenciones && (

              <div className="detenidos-table">
                <table>
                  <thead>
                    <tr>
                      <th rowSpan="2">Detenidos</th>
                      <th colSpan="4">Última semana</th>
                      <th colSpan="2">Último mes</th>
                      <th colSpan="2">A la Fecha </th>
                    </tr>
                    <tr>
                      {/* Sub-encabezados para 'Última semana' */}
                      <th>2022</th>
                      <th>2023</th>
                      <th>Variación %</th>
                      {/* Sub-encabezados para 'Último mes' y 'A la fecha actual' */}
                      <th>2022</th>
                      <th>2023</th>
                      <th>Variación %</th>
                      <th>2022</th>
                      <th>2023</th>
                      <th>Variación %</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datosDetenidos.map((row, index) => (
                      <tr key={index}>
                        <td>{row.categoria}</td>
                        <td>{row['2022_semana']}</td>
                        <td>{row['2023_semana']}</td>
                        <td>{row['variacion_semana']}</td>
                        <td>{row['2022_mes']}</td>
                        <td>{row['2023_mes']}</td>
                        <td>{row['variacion_mes']}</td>
                        <td>{row['2022_fecha']}</td>
                        <td>{row['2023_fecha']}</td>
                        <td>{row['variacion_fecha']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ... (otros elementos y tablas) */}
      </div>
    </div>
  );
};

export default FiltroDatosMapa;


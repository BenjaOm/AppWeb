import React, { useState } from 'react';
import '../Assets/SideBarDashboard.css'; // Importa el nuevo CSS

const SideBarDashboard = ({ isOpen, onClose }) => {
    const [selectedWeek, setSelectedWeek] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedComisaria, setSelectedComisaria] = useState('');
  const [selectedCuadrante, setSelectedCuadrante] = useState('');
  const [selectedUnidad, setSelectedUnidad] = useState('');

  // Manejadores de eventos para los selectores
  const handleWeekChange = (event) => {
    setSelectedWeek(event.target.value);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const handleComisariaChange = (event) => {
    setSelectedComisaria(event.target.value);
  };

  const handleCuadranteChange = (event) => {
    setSelectedCuadrante(event.target.value);
  };

  const handleUnidadChange = (event) => {
    setSelectedUnidad(event.target.value);
  };

  return (
    <div className={`custom-sidebar ${isOpen ? 'open' : ''}`}>
    <button className="close1-btn" onClick={onClose}>×</button>    
      <h2>Filtros</h2>
      <div className="custom-filter-group">
        <label htmlFor="week-select">Semana:</label>
        <select id="week-select" value={selectedWeek} onChange={handleWeekChange}>
          {/* Opciones de semana */}
        </select>
      </div>
      <div className="custom-filter-group">
        <label htmlFor="month-select">Mes:</label>
        <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
          {/* Opciones de mes */}
        </select>
      </div>
      <div className="custom-filter-group">
        <label htmlFor="year-select">Año:</label>
        <select id="year-select" value={selectedYear} onChange={handleYearChange}>
          {/* Opciones de año */}
        </select>
      </div>
      <div className="custom-filter-group">
        <label htmlFor="comisaria-select">Comisaría:</label>
        <select id="comisaria-select" value={selectedComisaria} onChange={handleComisariaChange}>
          {/* Opciones de comisaría */}
        </select>
      </div>
      <div className="custom-filter-group">
        <label htmlFor="cuadrante-select">Cuadrante:</label>
        <select id="cuadrante-select" value={selectedCuadrante} onChange={handleCuadranteChange}>
          {/* Opciones de cuadrante */}
        </select>
      </div>
      <div className="custom-filter-group">
        <label htmlFor="unidad-select">Unidad:</label>
        <select id="unidad-select" value={selectedUnidad} onChange={handleUnidadChange}>
          {/* Opciones de unidad */}
        </select>
      </div>
    </div>
  );
};

export default SideBarDashboard;


import React, { useState, useEffect } from 'react';
import '../Assets/EstadisticasDashboard.css';

const EstadisticasDashboard = () => {
  const [denuncias, setDenuncias] = useState([]);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  useEffect(() => {
    // Calcular el porcentaje de cambio en el último mes
    if (denuncias.length > 0) {
      const currentDate = new Date();
      const lastMonth = new Date();
      lastMonth.setMonth(lastMonth.getMonth() - 1);

      const denunciasUltimoMes = denuncias.filter((denuncia) => {
        const fechaDenuncia = new Date(denuncia.fecha);
        return fechaDenuncia >= lastMonth && fechaDenuncia <= currentDate;
      });

      const totalDenuncias = denuncias.length;
      const denunciasEnUltimoMes = denunciasUltimoMes.length;

      if (totalDenuncias > 0) {
        const percentage = ((denunciasEnUltimoMes / totalDenuncias) * 100).toFixed(2);
        setPercentageChange(percentage);
      }
    }
  }, [denuncias]);

  return (
    <div className="dashboard-stats">
      <div className="stat-card">
        <div className="stat-icon users"></div>
        <div className="stat-content">
          <h3>Delitos</h3>
          <p>{denuncias.length}</p>
          <p className="stat-diff">{percentageChange}% Cambio en el último mes</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon users"></div>
        <div className="stat-content">
          <h3>Denuncias realizadas</h3>
          <p>2,300</p>
          <p className="stat-diff">+3% En El Último Mes</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon revenue"></div>
        <div className="stat-content">
          <h3>Tendencia delictual</h3>
          <p>34k</p>
          <p className="stat-diff">+1% Que el año Pasado</p>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon followers"></div>
        <div className="stat-content">
          <h3>Delitos de Mayor connotación Social</h3>
          <p>+91</p>
          <p className="stat-diff">+30% El Último Mes</p>
        </div>
      </div>
    </div>
  );
};

export default EstadisticasDashboard;

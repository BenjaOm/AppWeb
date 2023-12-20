import React, { useState } from 'react';
import { Bar, Line, Pie, Radar, Scatter } from 'react-chartjs-2';
import 'chart.js/auto';
import '../Assets/Dashboard.css'; // Importa el nuevo CSS

import SideBarDashboard from '../Componentes/SideBarDashboard';

const dataBar = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Denuncias',
      data: [65, 59, 80, 81, 56, 55],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
    {
      label: 'Detenciones',
      data: [28, 48, 40, 19, 86, 27],
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
};

const dataLine = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
  datasets: [
    {
      label: 'Alertas Validadas',
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: '#742774',
    },
  ],
};

const dataPie = {
  labels: ['Robo', 'Asalto', 'Fraude', 'Homicidio'],
  datasets: [
    {
      data: [300, 50, 100, 40],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#EC932F'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#EC932F'],
    },
  ],
};

const dataRadar = {
  labels: ['Comer', 'Beber', 'Dormir', 'Diseñar', 'Codificar', 'Ciclismo', 'Correr'],
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const dataScatter = {
  datasets: [
    {
      label: 'Scatter Dataset',
      data: Array.from({ length: 10 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      })),
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
  ],
};

const optionsScatter = {
  scales: {
    x: {
      type: 'linear',
      position: 'bottom',
    },
  },
};



const Dashboard = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (

    
    <div className={`dashboard ${isSidebarOpen ? 'sidebar-open' : ''}`}>
    {/* Botón para abrir/cerrar el sidebar */}
    <button onClick={toggleSidebar} className="sidebar-toggle">
        ☰ {/* Ícono de menú */}
      </button>

      <SideBarDashboard isOpen={isSidebarOpen} onClose={toggleSidebar} />
    <div className="charts-grid">
      
      {/* Gráfico de Barras */}
      <div className="chart-card">

        <h3>Comparativa de cantidad de denuncias</h3>
        <div className="chart-container">
          <Bar data={dataBar} />
        </div>
      </div>

      {/* Gráfico de Líneas */}
      <div className="chart-card">
        <h3>Tendencia Delictiva</h3>
        <div className="chart-container">
          <Line data={dataLine} />
        </div>
      </div>

      {/* Gráfico Circular */}
      <div className="chart-card">
        <h3>Rango Etario más Afectado</h3>
        <div className="chart-container">
          <Pie data={dataPie} />
        </div>
      </div>

      {/* Gráfico de Radar */}
      <div className="chart-card">
        <h3>Gráfico de Radar</h3>
        <div className="chart-container">
          <Radar data={dataRadar} />
        </div>
      </div>

      {/* Gráfico de Dispersión */}
      <div className="chart-card">
        <h3>Gráfico de Dispersión</h3>
        <div className="chart-container">
          <Scatter data={dataScatter} options={optionsScatter} />
        </div>
      </div>

        {/* Añade más tarjetas para otros gráficos */}
      </div>

     
    </div>
    
  );
};

export default Dashboard;

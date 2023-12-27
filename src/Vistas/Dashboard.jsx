import {useState, useEffect} from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Assets/Dashboard.css'; // Make sure the path is correct
import SideBarDashboard from '../Componentes/SideBarDashboard';
import EstadisticasDashboard from './EstadisticasDashboard';

// Data for the bar chart
const dataBar = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      label: 'Website Views',
      data: [40, 20, 12, 39, 10, 40, 39],
      backgroundColor: 'rgba(23, 125, 255, 0.7)',
      borderColor: 'rgba(23, 125, 255, 1)',
      borderWidth: 1,
    },
  ],
};

// Data for the line charts
const dataLineSales = {
  labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Daily Sales',
      data: [400, 300, 200, 280, 350, 250, 400],
      fill: false,
      borderColor: 'rgba(40, 167, 69, 1)',
      backgroundColor: 'rgba(40, 167, 69, 0.2)',
      tension: 0.1,
      pointRadius: 5,
    },
  ],
};

const dataLineTasks = {
  ...dataLineSales,
  datasets: [
    {
      ...dataLineSales.datasets[0],
      borderColor: 'rgba(108, 117, 125, 1)',
      backgroundColor: 'rgba(108, 117, 125, 0.2)',
    },
  ],
};

// Chart options
const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const Dashboard = () => {




  const [denuncias, setDenuncias] = useState([]);
  const [totalDenunciasValidadas, setTotalDenunciasValidadas] = useState(0);

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
    const fetchTotalDenunciasValidadas = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/denunciaValidada/total');
        if (!response.ok) {
          throw new Error('Error al cargar el número total de denuncias validadas');
        }
        const data = await response.json();
        setTotalDenunciasValidadas(data.total);
      } catch (error) {
        console.error('Error al cargar el número total de denuncias validadas:', error);
      }
    };

    fetchTotalDenunciasValidadas();
  }, []);

     // Extrae las fechas y el total de denuncias
  const fechas = denuncias.map((denuncia) => new Date(denuncia.fecha).toLocaleDateString());
  const totalesDenuncias = Array.from({ length: fechas.length }, (_, i) =>
    denuncias.slice(0, i + 1).length
  );

  const data = {
    labels: fechas,
    datasets: [
      {
        label: 'Total de Denuncias',
        data: totalesDenuncias,
        fill: false,
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        tension: 0.1,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        stepSize: 1, // Esto asegurará que los valores sean números enteros
      },
    },
  };

  return (
    <div className="dashboard">
          <SideBarDashboard/>
          <EstadisticasDashboard/>
          <div className="chart-card">
          <Line data={data} options={options} />

        <Bar
          data={{
            labels: ['Denuncias Validadas'], // Etiqueta única para el número total de denuncias validadas
            datasets: [
              {
                label: 'Total de Denuncias Validadas',
                data: [totalDenunciasValidadas], // Datos con el número total
                backgroundColor: 'rgba(23, 125, 255, 0.7)',
                borderColor: 'rgba(23, 125, 255, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={options}
        />
        <p className="chart-title">Estado de Denuncias</p>
        <p className="chart-info">Last Campaign Performance</p>
        <p className="chart-update">campaign sent 2 days ago</p>
      </div>
      <div className="chart-card">
        <Line data={dataLineSales} options={options} />
        <p className="chart-title">Daily Sales</p>
        <p className="chart-info">(+15%) increase in today sales.</p>
        <p className="chart-update">updated 4 min ago</p>
      </div>
      <div className="chart-card">
        <Line data={dataLineTasks} options={options} />
        <p className="chart-title">Completed Tasks</p>
        <p className="chart-info">Last Campaign Performance</p>
        <p className="chart-update">just updated</p>
      </div>
    </div>
  );
};

export default Dashboard;

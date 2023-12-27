import React from 'react';
import '../Assets/SideBarDashboard.css'; // Ensure the CSS file is in the same directory
import logo from '../Assets/logoappweb.png'; // Adjust the path if necessary

const SideBarDashboard = () => {
  return (
    <aside className="sidebar-dashboard">
      <div className="sidebar-dashboard-header">
      <img src={logo} alt="Material Dashboard 2" className="sidebar-dashboard-logo" />
        <h2>Dashboard</h2>
      </div>
      <nav className="nav-dashboard">
        <a href="/dashboard" className="nav-dashboard-link active">Dashboard</a>
        <a href="/tables" className="nav-dashboard-link">Tablas de datos</a>
        <a href="/notifications" className="nav-dashboard-link">Notificaciones</a>
        <a href="/profile" className="nav-dashboard-link">Perfil</a>
        <a href="/signin" className="nav-dashboard-link">Iniciar Sesión</a>
        <a href="/signup" className="nav-dashboard-link">Cerrar Sesión</a>
      </nav>
    </aside>
  );
};

export default SideBarDashboard;

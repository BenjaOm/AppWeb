import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from '../Vistas/Inicio';
import Dashboard from '../Vistas/Dashboard';
import Denuncias from '../Vistas/Denuncias';
import HistorialDenuncias from '../Vistas/HistorialDenuncias';
import Mapa from '../Vistas/Mapa';
import PanelControl from '../Vistas/PanelControl';
import Navbar from '../Componentes/Navbar';
import Login from '../Vistas/Login';
import AdvancedSidebar from '../Componentes/SideBar';
import Header from '../Componentes/Header';
import RegistrarCarabinero from '../Vistas/RegistrarCarabinero';


const Rutas = () => {

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <Router>
       
        <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/denuncias" element={<Denuncias />} />
        <Route path="/historial-denuncias" element={<HistorialDenuncias />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/panel-control" element={<PanelControl />} />
        <Route path="/registroCarabinero" element={<RegistrarCarabinero />} />


      </Routes>
    </Router>
  );
}

export default Rutas;

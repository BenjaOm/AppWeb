import React, { useState } from 'react';
import '../Assets/Mapa.css';

const SideBarMapa = ({ onOpenModal, onOpenModalCapas, onClose }) => {
    const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <>
       <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* ...botón para cerrar el sidebar */}
      <button className="close2-btn" onClick={onClose}>×</button>  
      <a href="#" className="sidebar-item" onClick={onOpenModal}>
        Abrir Filtros
      </a>
      <a href="#" className="sidebar-item" onClick={onOpenModalCapas}>
        Abrir Capas
      </a>
      </div>

      <div className="content">
        <button onClick={toggleSidebar} className="open-btn">
          &#9776;
        </button>
        <div>
          <h1>Animated Sidebar</h1>
          <p>Click on the "hamburger menu" to slide in the side navigation.</p>
        </div>
      </div>
    </>
  );
};

export default SideBarMapa;

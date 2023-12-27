import React, { useState } from 'react';
import '../Assets/Mapa.css';

const SideBarMapa = ({ onOpenModal, onOpenModalCapas, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    // Cierra el sidebar cuando se hace clic en un enlace
    setIsOpen(false);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Botón para cerrar el sidebar */}
        <button className="close2-btn" onClick={() => setIsOpen(false)}>
          &times;
        </button>
        <a href="#" className="sidebar-item" onClick={() => { onOpenModal(); handleLinkClick(); }}>
          Abrir Filtros
        </a>
        <a href="#" className="sidebar-item" onClick={() => { onOpenModalCapas(); handleLinkClick(); }}>
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

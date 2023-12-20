// CapasDatos.js
import React, { useState } from 'react';
import '../Assets/Capas.css';
import CheckBoxCapas from './CheckBoxCapas';

const CapasDatos = ({ isVisible, onClose, onToggleRobbery }) => {
    // Este estado podría ser levantado al componente padre si es necesario
  const [checkedItems, setCheckedItems] = useState({
    "Robos": false,
    "Hurtos": false,
    "Homicidios": false,
    "Violaciones": false,
    "Robos con violencia": false,
    "Nivel de riesgo social": false,
    "Nivel de riesgo vial": false,
    "Nivel de riesgo situacional": false
  });
 
 
  const handleToggle = (label) => {
    const newState = { ...checkedItems, [label]: !checkedItems[label] };
    setCheckedItems(newState);

    // Si el label es "Robos", activar o desactivar el polígono en el mapa.
    if (label === "Robos") {
      onToggleRobbery(newState["Robos"]);
    }
  };

  const items = [
    'Robos', 
    'Hurtos', 
    'Homicidios', 
    'Violaciones', 
    'Robos con violencia', 
    'Nivel de riesgo social', 
    'Nivel de riesgo vial', 
    'Nivel de riesgo situacional'
  ];

  return (
    <div className={`modal-capas ${isVisible ? 'active' : ''}`}>
      <div className={`modal-capas-content ${isVisible ? 'active' : ''}`}>
        <h2>Capas de Datos</h2>
        <div className="checklist-container">
          {Object.keys(checkedItems).map((item) => (
            <CheckBoxCapas
              key={item}
              label={item}
              isChecked={checkedItems[item]}
              onToggleRobbery={() => handleToggle(item)}
            />
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CapasDatos;

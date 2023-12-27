// Importaci    import React, { useState, useEffect } from 'react';
// CapasDatos.js
import React, { useState } from 'react';
import '../Assets/Capas.css';
import CheckBoxCapas from './CheckBoxCapas';

const CapasDatos = ({ isVisible, onClose, onToggleLayer }) => {
  const [checkedItems, setCheckedItems] = useState({
    "Robos": false,
    "Todos los Delitos": false,
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
    onToggleLayer(label, newState[label]);
  };

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
              onToggleRobbery={() => handleToggle(item)} // Cambie el nombre de esta prop si es necesario
            />
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default CapasDatos;

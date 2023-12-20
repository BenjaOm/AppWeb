import React from 'react';

const CheckBoxCapas = ({ label, isChecked, onToggleRobbery }) => {
  return (
    <div className="checkbox-item">
      <input
        type="checkbox"
        id={label}
        name={label}
        checked={isChecked}
        onChange={onToggleRobbery} // Se invoca cuando el checkbox cambia
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
};

export default CheckBoxCapas;

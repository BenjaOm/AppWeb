import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'; // Import the login icon

const Navbar = () => {
  return (
    <ul className="navbar">


      <li>
        <NavLink to="/dashboard" activeClassName="active">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/denuncias" activeClassName="active">Denuncias</NavLink>
      </li>
    
      <li>
        <NavLink to="/mapa" activeClassName="active">Mapa</NavLink>
      </li>
      <li>
        <NavLink to="/panel-control" activeClassName="active">Panel de Control</NavLink>

      </li>
      <li>
        <NavLink to="/Login" activeClassName="active">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </NavLink>
      </li>
   
    </ul>
  );
}

export default Navbar;

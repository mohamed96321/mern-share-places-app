import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../../context/auth-context";
import './NavLinks.css'

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/${auth.userId}/places`}>MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">SIGN IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button inverse="true" onClick={auth.logout}>LOG OUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../../context/auth-context";
import './NavLinks.css'
import { Button } from "@mui/material";

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>USERS</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/places">MY PLACES</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/places/new">ADD PLACE</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">LOG IN</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <Button inverse="true" onClick={auth.logout}>LOG OUT</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
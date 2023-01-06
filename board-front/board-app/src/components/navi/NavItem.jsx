import React from 'react';
import "./Navigation.css";
import { Link } from "react-router-dom";

function NavItem({data, offNav}) {

  return (
      <Link to={`${data.address}`} className="menu__item" onClick={()=> offNav()}>
        <label>{'\u00A0'}|{'\u00A0'}{data.name}{'\u00A0'}</label>
      </Link>
  );
}

export default NavItem;
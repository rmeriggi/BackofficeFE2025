import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from "react-router";
import { checkIsActive } from "../../../../_helpers";

export default function Submenues({link, name}) {

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url) 
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <li
    className={`menu-item ${getMenuItemActive(
      `${link}`
    )}`}
    aria-haspopup="true"
    >
    <NavLink className="menu-link" to={link}>
      <i className="menu-bullet menu-bullet-dot">
        <span />
      </i>
      <span className="menu-text">{name}</span>
    </NavLink>
  </li>
  )
}

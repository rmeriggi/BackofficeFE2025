import React from 'react'
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl, checkIsActive } from "../../../../_helpers";
import Submenues from './Submenues';


export default function HeaderMenu({itemActive, nameMenu, icon, subMenu}) {

  const location = useLocation();
  const getMenuItemActive = (url, hasSubmenu = false) => {
    return checkIsActive(location, url) 
      ? ` ${!hasSubmenu &&
          "menu-item-active"} menu-item-open menu-item-not-hightlighted`
      : "";
  };

  return (
    <li
      className={`menu-item menu-item-submenu ${getMenuItemActive(
      `/${itemActive}`,
        true
      )}`}
      aria-haspopup="true"
      data-menu-toggle="hover"
    >
      <NavLink className="menu-link menu-toggle" to={`/${itemActive}`}>
        <span className="svg-icon menu-icon">
          <SVG src={toAbsoluteUrl(icon)} />
        </span>
        <span className="menu-text">{nameMenu}</span>
        <i className="menu-arrow" />
      </NavLink>
      <div className="menu-submenu ">
        <ul className="menu-subnav">
          <ul className="menu-subnav">
            <li
              className="menu-item  menu-item-parent"
              aria-haspopup="true"
            >
              <span className="menu-link">
                <span className="menu-text">{nameMenu}</span>
              </span>
            </li>
            {subMenu.map(sM => {
              return sM.access === 0 ? null : <Submenues key={sM.name} link={sM.link} name={sM.name}/>
            })}
            </ul>
        </ul>
      </div>
    </li>
  )
}

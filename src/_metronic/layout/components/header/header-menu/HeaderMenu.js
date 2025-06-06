import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import { checkIsActive } from "../../../../_helpers";
import { Dropdown, DropdownButton } from "react-bootstrap";

export function HeaderMenu({ layoutProps }) {
    const location = useLocation();
    const getMenuItemActive = (url) => {
        return checkIsActive(location, url) ? "menu-item-active" : "";
    }

    return <div
        id="kt_header_menu"
        className={`header-menu header-menu-mobile ${layoutProps.ktMenuClasses}`}
        {...layoutProps.headerMenuAttributes}
    >
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
            <li className={`menu-item menu-item-rel ${getMenuItemActive('/')}`}>
            <DropdownButton title="Clientes">
                <Dropdown.Item as="button">
                    <NavLink className="menu-link" to="/statistics">
                        <span className="menu-text">Estadisticas</span>
                    </NavLink> 
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <NavLink className="menu-link" to="/clients">
                        <span className="menu-text">Clientes</span>
                    </NavLink> 
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <NavLink className="menu-link" to="/categories">
                        <span className="menu-text">Categorias</span>
                    </NavLink> 
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <NavLink className="menu-link" to="/levels">
                        <span className="menu-text">Niveles</span>
                    </NavLink> 
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <NavLink className="menu-link" to="/state">
                        <span className="menu-text">Estados</span>
                    </NavLink> 
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <NavLink className="menu-link" to="/scores">
                        <span className="menu-text">Scores</span>
                    </NavLink> 
                </Dropdown.Item>
                <Dropdown.Item as="button">
                    <NavLink className="menu-link" to="/contacts">
                        <span className="menu-text">Contactos</span>
                    </NavLink> 
                </Dropdown.Item>
            </DropdownButton> 
            </li>
        </ul>
    </div>;
}

import React from "react";
import { useSelector } from "react-redux";
import HeaderMenu from "./HeaderMenu";

const hasAccessInSubmenuItems = (menuItem) => menuItem.subMenu.reduce((acc, subMenuItem) => acc + subMenuItem.access, 0) > 0;

export function AsideMenuList({ layoutProps }) {

  const menu = useSelector(state => state.auth.menu);

  if (!menu) {
    return <></>;
  }

  return (
    <>
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li className="menu-section ">
          <h4 className="menu-text">HNT BANK</h4>
        </li>
        {
          menu.map(m => {
            return m.access === 0 || !hasAccessInSubmenuItems(m) ? null :
            <HeaderMenu
              key={m.nameMenu}
              itemActive={m.itemActive}
              nameMenu={m.nameMenu}
              icon={m.icon}
              subMenu={m.subMenu}
            />
          }
          )
        }
        <HeaderMenu
          key={"Reportes"}
          itemActive={"reports"}
          nameMenu={"Reportes"}
          icon={"/media/svg/icons/Communication/Clipboard-list.svg"}
          subMenu={[{name: "Cliente Socio", link: "/reports/clients"}]}
        />
      </ul>
    </>
  );
}

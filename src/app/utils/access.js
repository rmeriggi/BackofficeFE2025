import { AccessDeniedPage } from "../pages/AccessDeniedPage";

export const ACCESS_GRANTED = 1;
export const ACCESS_DENIED = 0;

export const checkRouteAccess = (key, PageComponent, access) => {
  if (!access || typeof access[key] == "undefined") {
    return PageComponent;
  }

  if (access[key] === ACCESS_DENIED) {
    return AccessDeniedPage;
  }

  return PageComponent;
};

export const getFirstPageLinkWithAccess = (menu, access) => {
  if (typeof menu != "undefined" && typeof access != "undefined") {
    for (let key in access) {
      if (!key.includes(".")) continue;
      if (access[key] === ACCESS_GRANTED) {
        if (key.includes(".")) {
          const firstLevelCategory = key.split(".")[0];
          if (access[firstLevelCategory] === ACCESS_GRANTED) {
            return getMenuLinkForSubmenu(menu, key);
          }
        }
      }
    }
  }
  return "/";
};

const getMenuLinkForSubmenu = (menu, submenuKey) => {
  const [firstLevelCategory, secondLevelCategory] = submenuKey.split(".");

  return menu
    .find((mItem) => mItem.itemActive === firstLevelCategory)
    .subMenu.find((submItem) => submItem.name === secondLevelCategory).link;
};

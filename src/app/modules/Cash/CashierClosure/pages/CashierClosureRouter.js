import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

/* import ErrorPageMenu from "./ErrorPageMenu"; */
import { checkRouteAccess } from "../../../../utils/access";
/* import CreateProductPPPage from "./CreateProductPPPage";
 */
const CashierClosurePage = lazy(() => import("./CashierClosurePage"));

export default function CashierClosureRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/cash";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/close"}
        component={checkRouteAccess(
          "cash.Cierre de Caja",
          CashierClosurePage,
          access
        )}
      />

      {/*   <Route component={ErrorPageMenu} /> */}
    </Switch>
  );
}

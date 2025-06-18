import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

/* import ErrorPageMenu from "./ErrorPageMenu"; */
import { checkRouteAccess } from "../../../../utils/access";
/* import CreateProductPPPage from "./CreateProductPPPage";
 */
const CashierPage = lazy(() => import("./CashierPage"));

export default function CashierRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/cash";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/cashier"}
        component={checkRouteAccess("cash.Cajero", CashierPage, access)}
      />

      {/*   <Route component={ErrorPageMenu} /> */}
    </Switch>
  );
}

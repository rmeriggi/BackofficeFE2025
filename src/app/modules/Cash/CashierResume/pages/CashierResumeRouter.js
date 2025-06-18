import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

/* import ErrorPageMenu from "./ErrorPageMenu"; */
import { checkRouteAccess } from "../../../../utils/access";
/* import CreateProductPPPage from "./CreateProductPPPage";
 */
const CashierResumePage = lazy(() => import("./CashierResumePage"));

export default function CashierResumeRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/cash";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/movements"}
        component={checkRouteAccess(
          "cash.Movimientos Caja",
          CashierResumePage,
          access
        )}
      />

      {/*   <Route component={ErrorPageMenu} /> */}
    </Switch>
  );
}

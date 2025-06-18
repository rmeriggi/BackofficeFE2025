import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

/* import ErrorPageMenu from "./ErrorPageMenu"; */
import { checkRouteAccess } from "../../../../utils/access";
/* import CreateProductPPPage from "./CreateProductPPPage";
 */
const SettlementsPage = lazy(() => import("./SettlementsPage"));

export default function SettlementsRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/investments";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/liquidationpp"}
        component={checkRouteAccess(
          "investments.Liquidaciones",
          SettlementsPage,
          access
        )}
      />
      {/*  <Route
        path={baseRouterUrl + "/liquidationpp/create"}
        component={checkRouteAccess(
          "investments.Liquidaciones",
          CreateProductPPPage,
          access
        )}
      /> */}

      {/*   <Route component={ErrorPageMenu} /> */}
    </Switch>
  );
}

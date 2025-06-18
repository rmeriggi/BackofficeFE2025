import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { checkRouteAccess } from "../../../../utils/access";

const PpPage = lazy(() => import("./PpPage"));

export default function PpRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/investments";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/pp"}
        component={checkRouteAccess(
          "investments.Productos Plazo Fijo",
          PpPage,
          access
        )}
      />
      {/*    <Route
        path={baseRouterUrl + "/productspp/create"}
        component={checkRouteAccess(
          "investments.Productos Plazo Fijo",
          CreateProductPPPage,
          access
        )}
      /> */}

      {/*   <Route component={ErrorPageMenu} /> */}
    </Switch>
  );
}

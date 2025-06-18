import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { checkRouteAccess } from "../../../../utils/access";

const ManagementPpPage = lazy(() => import("./ManagementPpPage"));
const UpdatePp = lazy(() => import("./UpdatePp"));

export default function ManagementPpRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/investments";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/adminpp"}
        component={checkRouteAccess(
          "investments.Gestión Plazos Fijos",
          ManagementPpPage,
          access
        )}
      />
      <Route
        exact
        path={baseRouterUrl + "/adminpp/update/:id"}
        component={checkRouteAccess(
          "investments.Gestión Plazos Fijos",
          UpdatePp,
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

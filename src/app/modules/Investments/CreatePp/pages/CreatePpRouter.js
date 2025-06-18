import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { checkRouteAccess } from "../../../../utils/access";

const CreatePpPage = lazy(() => import("./CreatePpPage"));
const CreatePp = lazy(() => import("./CreatePp"));

export default function CreatePpRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/investments";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/newpp"}
        component={checkRouteAccess(
          "investments.Creación Plazo Fijo",
          CreatePpPage,
          access
        )}
      />
      <Route
        exact
        path={baseRouterUrl + "/newpp/create"}
        component={checkRouteAccess(
          "investments.Creación Plazo Fijo",
          CreatePp,
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

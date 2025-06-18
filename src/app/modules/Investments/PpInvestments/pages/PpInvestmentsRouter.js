import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

import { checkRouteAccess } from "../../../../utils/access";

const PpInvestmentsPage = lazy(() => import("./PpInvestmentsPage"));

export default function PpInvestmentsRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/investments";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/pfinvesments"}
        component={checkRouteAccess(
          "investments.Plazo Fijo Inversiones",
          PpInvestmentsPage,
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

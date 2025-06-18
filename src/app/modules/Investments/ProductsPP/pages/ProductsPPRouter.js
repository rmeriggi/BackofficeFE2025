import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";

/* import ErrorPageMenu from "./ErrorPageMenu"; */
import { checkRouteAccess } from "../../../../utils/access";
import CreateProductPPPage from "./CreateProductPPPage";

const ProductsPPPage = lazy(() => import("./ProductsPPPage"));

export default function ProductsPPRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/investments";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/productspp"}
        component={checkRouteAccess(
          "investments.Productos Plazo Fijo",
          ProductsPPPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/productspp/create"}
        component={checkRouteAccess(
          "investments.Productos Plazo Fijo",
          CreateProductPPPage,
          access
        )}
      />

      {/*   <Route component={ErrorPageMenu} /> */}
    </Switch>
  );
}

import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const LoansDashboardPage = lazy(() =>
  import("./Dashboard/pages/LoansDashboardPage")
);

const GuaranteesPage = lazy(() => import("./Guarantees/pages/GuaranteesPage"));

const MortgagesPage = lazy(() => import("./Mortgages/pages/MortgagesPage"));

const DocumentationPage = lazy(() =>
  import("./Documentation/pages/DocumentationPage")
);

export default function LoansRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/loans";

  return (
    <Switch>
      <Route
        exact
        path={baseRouterUrl + "/dashboard"}
        component={checkRouteAccess(
          "loans.Dashboard",
          LoansDashboardPage,
          access
        )}
      />
      <Route
        exact
        path={baseRouterUrl + "/guarantees"}
        component={checkRouteAccess("loans.Garantias", GuaranteesPage, access)}
      />
      <Route
        exact
        path={baseRouterUrl + "/mortgages"}
        component={checkRouteAccess("loans.Hipotecas", MortgagesPage, access)}
      />
      <Route
        exact
        path={baseRouterUrl + "/documentation"}
        component={checkRouteAccess(
          "loans.Documentacion",
          DocumentationPage,
          access
        )}
      />
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

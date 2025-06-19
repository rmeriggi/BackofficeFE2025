import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const AgreementsDashboardPage = lazy(() =>
  import("./Dashboard/pages/AgreementsDashboardPage")
);

const AgreementsAccountsPage = lazy(() =>
  import("./Accounts/pages/AgreementsAccountsPage")
);

export default function AgreementsRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/agreements";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/dashboard"}
        component={checkRouteAccess(
          "agreements.Dashboard",
          AgreementsDashboardPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/accounts"}
        component={checkRouteAccess(
          "agreements.Accounts",
          AgreementsAccountsPage,
          access
        )}
      />
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

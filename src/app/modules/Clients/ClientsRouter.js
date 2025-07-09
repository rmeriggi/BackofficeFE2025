import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { ContentRoute } from "../../../_metronic/layout";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const ClientsPage = lazy(() => import("./Clients/pages/ClientsPage.js"));

const PatronosPage = lazy(() => import("./Patronos/pages/PatronosPage.js"));

const StatisticsPage = lazy(() =>
  import("./Statistics/pages/StatisticsPage.js")
);

const BankAccountsPage = lazy(() =>
  import("./BankAccounts/pages/BankAccountsPage.js")
);

const DocumentsPage = lazy(() => import("./Documents/pages/DocumentsPage.js"));

const RelationsPage = lazy(() =>
  import("./Clients/components/clients-edit/Relations/pages/RelationsPage.js")
);

const SignaturesPage = lazy(() =>
  import("./Signatures/pages/SignaturesPage.js")
);

export default function ClientsRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/clients";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/clients"}
        component={checkRouteAccess("clients.Clientes", ClientsPage, access)}
      />
      <ContentRoute
        path={baseRouterUrl + "/patronos"}
        component={checkRouteAccess("clients.Patronos", PatronosPage, access)}
      />
      <ContentRoute
        path={baseRouterUrl + "/statistics"}
        component={checkRouteAccess(
          "clients.Estadisticas",
          StatisticsPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/bankaccounts"}
        component={checkRouteAccess(
          "clients.Cuentas Bancarias",
          BankAccountsPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/signatures"}
        component={checkRouteAccess(
          "clients.Esquema Firmas",
          SignaturesPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/relations"}
        component={RelationsPage}
      />
      <ContentRoute
        path={baseRouterUrl + "/documents"}
        component={DocumentsPage}
      />
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

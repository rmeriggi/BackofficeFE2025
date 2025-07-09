import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const ColectionPage = lazy(() =>
  import("./Collection/pages/CollectionPage.js")
);

const OperationsPage = lazy(() =>
  import("./Operations/pages/OperationsPage.js")
);

const ItauMovementsPage = lazy(() =>
  import("./Itau/pages/ItauMovementsPage.js")
);

const BankValuesPage = lazy(() =>
  import("./BankValues/pages/BankValuesMovementsPage.js")
);

const CollectionsNCPage = lazy(() =>
  import("./CollectionsNC/pages/CollectionsNCPage.js")
);

const BalancesItauPage = lazy(() =>
  import("./BalancesItau/pages/BalancesItauPage.js")
);

const CashierRouter = lazy(() => import("./Cashier/pages/CashierRouter.js"));

const CashierResumeRouter = lazy(() =>
  import("./CashierResume/pages/CashierResumeRouter.js")
);

const CashierClosureRouter = lazy(() =>
  import("./CashierClosure/pages/CashierClosureRouter.js")
);

const FilesRouter = lazy(() => import("./Files/pages/FilesRouter"));

const PlanillasProyectadasPage = lazy(() =>
  import("./Forms/pages/PlanillasProyectadasPage")
);

export default function CashRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/cash";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/collection"}
        component={checkRouteAccess("cash.Cobranzas", ColectionPage, access)}
      />
      <Route path={baseRouterUrl + "/operations"} component={OperationsPage} />
      <Route path={baseRouterUrl + "/itau"} component={ItauMovementsPage} />
      <Route path={baseRouterUrl + "/values"} component={BankValuesPage} />
      <Route
        path={baseRouterUrl + "/nccollections"}
        component={CollectionsNCPage}
      />
      <Route
        path={baseRouterUrl + "/balances-itau"}
        component={BalancesItauPage}
      />
      <Route
        path={baseRouterUrl + "/cashier"}
        component={checkRouteAccess("cash.Cajero", CashierRouter, access)}
      />
      <Route
        path={baseRouterUrl + "/movements"}
        component={checkRouteAccess(
          "cash.Movimientos Caja",
          CashierResumeRouter,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/close"}
        component={checkRouteAccess(
          "cash.Cierre de Caja",
          CashierClosureRouter,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/files"}
        component={checkRouteAccess("cash.Archivos", FilesRouter, access)}
      />
      <Route
        path={baseRouterUrl + "/forms"}
        component={checkRouteAccess(
          "cash.Planillas",
          PlanillasProyectadasPage,
          access
        )}
      />
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

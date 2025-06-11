import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const CardsIssuedPage = lazy(() =>
  import("./Cards-Issued/pages/CardsIssuedPage.js")
);

const TransactionsPage = lazy(() =>
  import("./Transactions/pages/TransactionsPage.js")
);
const ProductsPage = lazy(() => import("./Products/pages/ProductsPage.js"));

const ProvidersPage = lazy(() => import("./Providers/pages/ProvidersPage.js"));

/* const IssuersPage = lazy(() => import("./Issuers/pages/IssuersPage.js"));
 */
const ConciliationPage = lazy(() =>
  import("./Conciliation/pages/ConciliationPage.js")
);

const DashboardPage = lazy(() => import("./Dashboard/pages/DashboardPage"));

const LimitsPage = lazy(() => import("./Limits/pages/LimitsPage.js"));

const StatusPage = lazy(() => import("./Status/pages/StatusPage.js"));

const TypesPage = lazy(() => import("./Types/pages/TypesPage.js"));

const BrandsPage = lazy(() => import("./Brands/pages/BrandsPage.js"));

const DistributorsPage = lazy(() =>
  import("./Distributors/pages/DistributorsPage.js")
);

export default function CardsRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/cards";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/dashboard"}
        component={checkRouteAccess(
          "cards.Dashboard Tarjetas",
          DashboardPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/cards"}
        component={checkRouteAccess(
          "cards.Tarjetas emitidas",
          CardsIssuedPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/conciliation"}
        component={checkRouteAccess(
          "cards.Conciliación",
          ConciliationPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/transactions"}
        component={checkRouteAccess(
          "cards.Transacciones",
          TransactionsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/products"}
        component={checkRouteAccess("cards.Productos", ProductsPage, access)}
      />
      <Route
        path={baseRouterUrl + "/limits"}
        component={checkRouteAccess(
          "cards.Limites/Control",
          LimitsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/providers"}
        component={checkRouteAccess(
          "cards.Procesadores",
          ProvidersPage,
          access
        )}
      />
      {/*  <Route path={baseRouterUrl + "/issuers"} component={checkRouteAccess('cards.Emisores', ProvidersPage, access)}/> */}
      <Route
        path={baseRouterUrl + "/status"}
        component={checkRouteAccess("cards.Estados", StatusPage, access)}
      />
      <Route
        path={baseRouterUrl + "/types"}
        component={checkRouteAccess("cards.Tipos Tarjetas", TypesPage, access)}
      />
      <Route
        path={baseRouterUrl + "/brands"}
        component={checkRouteAccess(
          "cards.Marcas Tarjetas",
          BrandsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/distributors"}
        component={checkRouteAccess(
          "cards.Distribuidores",
          DistributorsPage,
          access
        )}
      />
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

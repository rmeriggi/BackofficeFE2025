import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ContentRoute } from "../../../_metronic/layout";
import { ListingTableContextProvider } from "./DecidirSites/pages/Listing/ListingTableContext";
import { checkRouteAccess } from "../../utils/access";
import ErrorPageMenu from "../../pages/ErrorPageMenu";

const MovementsPage = lazy(() => import("./Movements/pages/MovementPage.js"));

const SitesPage = lazy(() => import("./DecidirSites/pages/SitesPage.js"));

const PaymentLinksPage = lazy(() =>
  import("./PaymentLinks/pages/PaymentLinksPage.js")
);

const DistributorsPage = lazy(() =>
  import("./Distributors/pages/DistributorsPage.js")
);

const DistributorsDetailPage = lazy(() =>
  import("./Distributors/pages/DistributorsDetail.js")
);

/*const AgreementsPage = lazy(() =>
  import("./Agreements/pages/PaymentLinksPage.js")
);*/

export default function ExternalChargesRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/externalcharges";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/movement"}
        component={checkRouteAccess(
          "externalcharges.Movimientos",
          MovementsPage,
          access
        )}
      />
      <ContentRoute
        path={baseRouterUrl + "/sites"}
        component={checkRouteAccess("externalcharges.Sites", SitesPage, access)}
        ContextProvider={ListingTableContextProvider}
      />
      <Route
        path={baseRouterUrl + "/links"}
        component={checkRouteAccess(
          "externalcharges.Link de Pagos",
          PaymentLinksPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/distributorslink"}
        component={checkRouteAccess(
          "externalcharges.Link Distribuidores",
          DistributorsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/distributorsDetail/:id"}
        component={DistributorsDetailPage}
      />
      {/*<Route path={baseRouterUrl + "/agreement"} component={AgreementsPage} />*/}
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

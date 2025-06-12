import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";

const ComunicationsPage = lazy(() =>
  import("./Comunications/pages/ComunicationsPage.js")
);

const ReportsPage = lazy(() => import("./Reports/pages/ReportsPage.js"));

const ArchivesPage = lazy(() => import("./Archives/pages/ArchivesPage.js"));

const ApartadoAPage = lazy(() => import("./ApartadoA/pages/SectionApage.js"));

const ApartadoBPage = lazy(() => import("./ApartadoB/pages/SectionBpage.js"));

const RegimenManual = lazy(() =>
  import("./RegimenManual/pages/ManualRegimePage.js")
);

export default function BcraRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/bcra";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/comunications"}
        component={checkRouteAccess(
          "bcra.Comunicaciones",
          ComunicationsPage,
          access
        )}
      />

      <Route
        path={baseRouterUrl + "/reports"}
        component={checkRouteAccess("bcra.Informes", ReportsPage, access)}
      />
      <Route
        path={baseRouterUrl + "/archives"}
        component={checkRouteAccess("bcra.Archivos", ArchivesPage, access)}
      />
      <Route
        path={baseRouterUrl + "/sectionA"}
        component={checkRouteAccess("bcra.Apartado A", ApartadoAPage, access)}
      />
      <Route
        path={baseRouterUrl + "/sectionB"}
        component={checkRouteAccess("bcra.Apartado B", ApartadoBPage, access)}
      />
      <Route
        path={baseRouterUrl + "/rimanual"}
        component={checkRouteAccess("bcra.RI Manual", RegimenManual, access)}
      />
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

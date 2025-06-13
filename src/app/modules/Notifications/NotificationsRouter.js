import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { Switch, Route } from "react-router-dom";
import ErrorPageMenu from "../../pages/ErrorPageMenu";
import { checkRouteAccess } from "../../utils/access";
import KycPage from "./Notifications/pages/KycPage.js";
import ManualCompliance from "./Notifications/components/ManualCompliance/pages/ManualCompliance.js";
import Plaft from "./Notifications/components/Plaft/pages/Plaft.js";
import Regulations from "./Notifications/components/Regulations/pages/Regulations.js";
const NotificationsPage = lazy(() =>
  import("./Notifications/pages/NotificationsPage.js")
);
const RosPage = lazy(() => import("../Bcra/Ros/pages/RosPage.js"));

export default function NotificationsRouter() {
  const access = useSelector((state) => state.auth.access);

  const baseRouterUrl = "/compliance";

  return (
    <Switch>
      <Route
        path={baseRouterUrl + "/inbox"}
        component={checkRouteAccess(
          "uif.Bandeja de Entrada",
          NotificationsPage,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/ros"}
        component={checkRouteAccess("uif.ROS", RosPage, access)}
      />
      <Route
        path={baseRouterUrl + "/kyc"}
        component={checkRouteAccess("uif.ROS", KycPage, access)}
      />
      <Route
        path={baseRouterUrl + "/manual"}
        component={checkRouteAccess(
          "uif.Manual Compliance",
          ManualCompliance,
          access
        )}
      />
      <Route
        path={baseRouterUrl + "/plaft"}
        component={checkRouteAccess("uif.PLAFT", Plaft, access)}
      />
      <Route
        path={baseRouterUrl + "/regulations"}
        component={checkRouteAccess("uif.Normativa", Regulations, access)}
      />
      <Route component={ErrorPageMenu} />
    </Switch>
  );
}

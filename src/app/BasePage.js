import React, { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../_metronic/layout";
import { checkRouteAccess } from "./utils/access";
import { useIdle } from "./hooks/useIdle";

const ClientsRouter = lazy(() =>
  import("../app/modules/Clients/ClientsRouter.js")
);

const BcraRouter = lazy(() => import("../app/modules/Bcra/BcraRouter.js"));

const AccountsRouter = lazy(() =>
  import("../app/modules/Accounts/AccountsRouter.js")
);

const TaxRouter = lazy(() => import("../app/modules/Taxes/TaxesRouter.js"));

const CreditsRouter = lazy(() =>
  import("../app/modules/Credits/CreditsRouter.js")
);

const LoyaltyRouter = lazy(() =>
  import("../app/modules/Loyalty/LoyaltyRouter.js")
);

const PspRouter = lazy(() => import("../app/modules/PSP/PspRouter.js"));

const SettingsRouter = lazy(() =>
  import("../app/modules/Settings/SettingsRouter.js")
);

const CardsRouter = lazy(() => import("../app/modules/Cards/CardsRouter.js"));

const AccountingRouter = lazy(() =>
  import("../app/modules/Accounting/AccountingRouter.js")
);

const ErrorPageMenu = lazy(() => import("./pages/ErrorPageMenu"));

const InvestmentsRouter = lazy(() =>
  import("../app/modules/Investments/InvestmentsRouter.js")
);

const CashRouter = lazy(() => import("../app/modules/Cash/CashRouter.js"));

const NotificationsRouter = lazy(() =>
  import("../app/modules/Notifications/NotificationsRouter.js")
);

const ExternalChargesRouter = lazy(() =>
  import("./modules/ExternalCharges/ExternalChargesRouter.js")
);

const ReportsRouter = lazy(() =>
  import("./modules/Reports/routes/ReportsRouter.js")
);

const EchecksRouter = lazy(() =>
  import("../app/modules/e-checks/E-check/echecksRouter.js")
);

const SuppliersRouter = lazy(() =>
  import("../app/modules/Suppliers/suppliersRouter.js")
);

export default function BasePage() {
  useIdle();

  const access = useSelector((state) => state.auth.access);

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {<Redirect exact from="/" to="/clients/statistics" />}
        <Route
          path="/clients"
          component={checkRouteAccess("clients", ClientsRouter, access)}
        />
        <Route
          path="/bcra"
          component={checkRouteAccess("bcra", BcraRouter, access)}
        />
        <Route
          path="/accounts"
          component={checkRouteAccess("accounts", AccountsRouter, access)}
        />
        <Route
          path="/taxes"
          component={checkRouteAccess("taxes", TaxRouter, access)}
        />
        <Route
          path="/credits"
          component={checkRouteAccess("credits", CreditsRouter, access)}
        />
        <Route
          path="/loyalty"
          component={checkRouteAccess("loyalty", LoyaltyRouter, access)}
        />
        <Route
          path="/psp"
          component={checkRouteAccess("psp", PspRouter, access)}
        />
        <Route
          path="/settings"
          component={checkRouteAccess("settings", SettingsRouter, access)}
        />
        <Route
          path="/cards"
          component={checkRouteAccess("cards", CardsRouter, access)}
        />
        <Route
          path="/accounting"
          component={checkRouteAccess("accounting", AccountingRouter, access)}
        />
        <Route
          path="/investments"
          component={checkRouteAccess("investments", InvestmentsRouter, access)}
        />
        <Route
          path="/echeqs"
          component={checkRouteAccess("schema", EchecksRouter, access)}
        />
        <Route
          path="/suppliers"
          component={checkRouteAccess("settings", SuppliersRouter, access)}
        />
        <Route
          path="/cash"
          component={checkRouteAccess("cash", CashRouter, access)}
        />
        <Route
          path="/compliance"
          component={checkRouteAccess("uif", NotificationsRouter, access)}
        />
        <Route path="/externalcharges" component={ExternalChargesRouter} />
        <Route
          path="/reports"
          component={checkRouteAccess("reports", ReportsRouter, access)}
        />
        <Route component={ErrorPageMenu} />
      </Switch>
    </Suspense>
  );
}
